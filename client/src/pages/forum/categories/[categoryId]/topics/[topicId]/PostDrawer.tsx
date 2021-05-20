import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { handleError } from "../../../../../../@common/@handleError";
import { apiAddPost } from "../../../../@common/forumApis";
import { Post } from "../../../../../../../../@types/forum.types";

interface Props {
  topicId: string;
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.MutableRefObject<undefined>;
  replyId: string | null;
}

export const PostDrawer = ({ topicId, btnRef, isOpen, onClose, replyId }: Props) => {
  const cache = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const addPost = useMutation((post: Post) => apiAddPost(post));
  const onSubmit = async (values: Post) => {
    try {
      const request = { ...values, topicId: topicId, replyId: replyId || null };
      const response = await addPost.mutateAsync(request);
      if (response?.errors) {
        throw response.errors;
      }
      cache.refetchQueries(["topic", topicId]);
      onClose();
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          reset();
          onClose();
        }}
        finalFocusRef={btnRef}
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Dodaj temat {replyId}</DrawerHeader>
            <DrawerBody>
              <FormControl isInvalid={errors.content} h="120">
                <FormLabel htmlFor="content">Treść</FormLabel>
                <Textarea
                  rows={4}
                  title="content"
                  placeholder="Treść"
                  {...register("content", { required: "Pole nie może być puste" })}
                />
                <FormErrorMessage>{errors.content && errors.content.message}</FormErrorMessage>
              </FormControl>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" type="submit" isLoading={isSubmitting}>
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
};
