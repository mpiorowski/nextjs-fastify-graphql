import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Grid, Textarea } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Chat } from "../../../../@types/chat.types";
import { handleError } from "../../@common/@handleError";
import { Pages } from "../Pages";
import { useAddChat, useChatSubscription } from "./@common/chat.api";

const ChatPage = (): ReactElement => {
  // subscription
  const { res } = useChatSubscription();

  const [chatList, setChatList] = useState<Chat[]>([]);

  useEffect(() => {
    res.data?.newestChat && setChatList([res.data.newestChat].concat(chatList));
  }, [res.data]);

  // form setup
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  // add chat mutation
  const addChat = useAddChat();

  // handle submit
  const onSubmit = async (values: Chat) => {
    try {
      const response = await addChat.mutate(values);
      if (response?.error) throw response.error;
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  };

  // if (loading) {
  //   return <div>Loading</div>;
  // }

  return (
    <Pages>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          width="80%"
          margin="auto"
          backgroundColor="gray.700"
          marginTop={10}
          borderRadius={6}
          padding={8}
          paddingTop={4}
          height={300}
          overflow="auto"
          alignContent="flex-start"
        >
          {chatList.map(
            (el) =>
              el && (
                <Flex alignItems="center" alignContent="center" height={10} borderBottom="1px solid gray" key={el.id}>
                  {el.content}
                </Flex>
              ),
          )}
        </Grid>
        <Flex width="80%" margin="auto" flexDirection="column">
          <FormControl isInvalid={errors.content} h="120">
            <FormLabel htmlFor="content">Dodaj wpis</FormLabel>
            <Textarea
              content="content"
              placeholder="Tytuł"
              {...register("content", { required: "Pole nie może być puste" })}
            />
            <FormErrorMessage>{errors.content && errors.content.message}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="green" type="submit" isLoading={isSubmitting}>
            Save
          </Button>
        </Flex>
      </form>
    </Pages>
  );
};

export default ChatPage;
