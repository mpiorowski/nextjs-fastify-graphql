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
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Category } from "../../../../@types/forum.types";
import { handleError } from "../../@common/@handleError";
import { useAddCategory } from "./@common/categories.api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.MutableRefObject<undefined>;
}

export const CategoryDrawer = ({ btnRef, isOpen, onClose }: Props): ReactElement => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const addCategory = useAddCategory();

  const onSubmit = async (values: Category) => {
    try {
      await addCategory.mutate(values);
      if (addCategory?.error) {
        throw addCategory.error;
      }
      onClose();
      reset();
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Dodaj kategorię</DrawerHeader>

            <DrawerBody>
              <FormControl isInvalid={errors.title} h="120">
                <FormLabel htmlFor="title">Tytuł</FormLabel>
                <Input
                  title="title"
                  placeholder="Tytuł"
                  {...register("title", { required: "Pole nie może być puste" })}
                />
                <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description} h="120">
                <FormLabel htmlFor="description">Opis</FormLabel>
                <Textarea
                  description="description"
                  rows={5}
                  placeholder="Tytuł"
                  {...register("description", { required: "Pole nie może być puste" })}
                />
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

  // return (
  //   <Drawer
  //     title={'Add category'}
  //     width={420}
  //     placement="right"
  //     closable={true}
  //     onClose={() => setDrawerVisibility(false)}
  //     visible={drawerVisibility}
  //     destroyOnClose={true}
  //     footer={
  //       <div
  //         style={{
  //           textAlign: 'right',
  //         }}
  //       >
  //         <Button onClick={() => setDrawerVisibility(false)} style={{ marginRight: 8 }}>
  //           Cancel
  //         </Button>
  //         <Button type="primary" htmlType="submit" onClick={onSubmit}>
  //           Submit
  //         </Button>
  //       </div>
  //     }
  //   >
  //     <Form name="category" initialValues={{ remember: true }} layout={'vertical'} form={form}>
  //       <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input name!' }]}>
  //         <Input />
  //       </Form.Item>
  //       <Form.Item label="Description" name="description">
  //         <TextArea rows={5} />
  //       </Form.Item>
  //     </Form>
  //   </Drawer>
  // );
};
