import { Button, FormControl, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Chat } from "../../../../@types/chat.types";
import { handleError } from "../../@common/@handleError";
import { Pages } from "../Pages";
import { apiAddChat } from "./@common/chatApis";

// interface Props {}

const ChatPage = () => {
  // form setup
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  // add chat mutatuin
  const addChat = useMutation((chat: Chat) => apiAddChat(chat));

  // handle submit
  const onSubmit = async (values: Chat) => {
    try {
      const response = await addChat.mutateAsync(values);
      if (response?.errors) {
        throw response.errors;
      }
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  };
  return (
    <Pages>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.content} h="120">
          <FormLabel htmlFor="content">Tytuł</FormLabel>
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
      </form>
    </Pages>
  );
};

export default ChatPage;
