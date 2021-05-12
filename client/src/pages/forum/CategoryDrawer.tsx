import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { apiAddCategory } from './@common/forumApis';
import { Category } from './@common/forumTypes';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.MutableRefObject<undefined>;
}

export const CategoryDrawer = ({ btnRef, isOpen, onClose }: Props) => {
  const cache = useQueryClient();
  // const [form] = Form.useForm();

  const addCategory = useMutation((category: Category) => apiAddCategory(category));
  const onSubmit = async () => {
    try {
      // const values = await form.validateFields();
      // await addCategory.mutateAsync(values);
      cache.refetchQueries('categories');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Dodaj kategorię</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green">Save</Button>
          </DrawerFooter>
        </DrawerContent>
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
