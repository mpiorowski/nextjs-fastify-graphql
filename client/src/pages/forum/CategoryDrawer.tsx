import { Button, Drawer, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { apiAddCategory } from './@common/forumApis';
import { Category } from './@common/forumTypes';

interface Props {
  drawerVisibility: boolean;
  setDrawerVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CategoryDrawer = ({ drawerVisibility, setDrawerVisibility }: Props) => {
  const cache = useQueryClient();
  const [form] = Form.useForm();

  const addCategory = useMutation((category: Category) => apiAddCategory(category), {
    onSuccess: async () => {
      cache.refetchQueries('categories');
    },
  });

  const onSubmit = () => {
    form
      .validateFields()
      .then((values: Category) => {
        addCategory.mutate(values);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Drawer
      title={'Add category'}
      width={420}
      placement="right"
      closable={true}
      onClose={() => setDrawerVisibility(false)}
      visible={drawerVisibility}
      destroyOnClose={true}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={() => setDrawerVisibility(false)} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      }
    >
      <Form name="category" initialValues={{ remember: true }} layout={'vertical'} form={form}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={5} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
