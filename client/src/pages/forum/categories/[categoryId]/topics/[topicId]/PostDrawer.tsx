import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { errorHandler } from '../../../../../../@common/@errorHandler';
import { apiAddPost } from '../../../../@common/forumApis';
import { Post } from '../../../../@common/forumTypes';

interface Props {
  topicId: string;
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.MutableRefObject<undefined>;
}

export const PostDrawer = ({ topicId, btnRef, isOpen, onClose }: Props) => {
  const cache = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const addPost = useMutation((post: Post) => apiAddPost(post));
  const onSubmit = async (values: Post) => {
    try {
      const request = { ...values, topicId: topicId };
      await addPost.mutateAsync(request);
      cache.refetchQueries(['topic', topicId]);
      onClose();
    } catch (error) {
      console.error(error);
      errorHandler(error);
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Dodaj temat</DrawerHeader>

            <DrawerBody>
              <FormControl isInvalid={errors.content} h="120">
                <FormLabel htmlFor="content">Treść</FormLabel>
                <Input title="content" placeholder="Treść" {...register('content', { required: 'Pole nie może być puste' })} />
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
