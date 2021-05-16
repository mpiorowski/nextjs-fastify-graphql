import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { errorHandler } from '../../../../@common/@errorHandler';
import { apiAddTopic } from '../../@common/forumApis';
import { Topic } from '../../@common/forumTypes';

interface Props {
  categoryId: string;
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.MutableRefObject<undefined>;
}

export const TopicDrawer = ({ categoryId, btnRef, isOpen, onClose }: Props) => {
  const cache = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const addTopic = useMutation((topic: Topic) => apiAddTopic(topic));
  const onSubmit = async (values: Topic) => {
    try {
      const request = { ...values, categoryId: categoryId };
      await addTopic.mutateAsync(request);
      cache.refetchQueries(['category', categoryId]);
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
              <FormControl isInvalid={errors.title} h="120">
                <FormLabel htmlFor="title">Tytuł</FormLabel>
                <Input title="title" placeholder="Tytuł" {...register('title', { required: 'Pole nie może być puste' })} />
                <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description} h="120">
                <FormLabel htmlFor="description">Opis</FormLabel>
                <Textarea description="description" rows={5} placeholder="Tytuł" {...register('description', { required: 'Pole nie może być puste' })} />
                <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
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
