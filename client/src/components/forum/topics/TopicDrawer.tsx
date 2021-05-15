import { Button, Drawer, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { apiRequest } from "../../../@common/@apiRequest";
import { Topic } from "../../../pages/forum/@common/forumTypes";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface Props {
  categoryUid: string;
  drawerVisibility: boolean;
  setDrawerVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

export const apiAddTopic = (categoryUid, topic: Topic) => {
  return apiRequest<Topic>({
    url: "http://localhost:3000/api/categories/" + categoryUid + "/topics",
    method: "POST",
    body: JSON.stringify(topic),
  });
};

export const TopicDrawer = ({ drawerVisibility, setDrawerVisibility, categoryUid }: Props) => {
  const cache = useQueryClient();
  const [form] = Form.useForm();

  const addCategory = useMutation((topic: Topic) => apiAddTopic(categoryUid, topic), {
    onSuccess: async () => {
      cache.refetchQueries(["topics", categoryUid]);
      setDrawerVisibility(false);
    },
  });

  const onSubmit = () => {
    form
      .validateFields()
      .then((values: Topic) => {
        addCategory.mutate(values);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Drawer
      title={"Add topic"}
      height={420}
      placement="bottom"
      closable={true}
      onClose={() => setDrawerVisibility(false)}
      visible={drawerVisibility}
      destroyOnClose={true}
      footer={
        <div
          style={{
            textAlign: "right",
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
      <Form
        // {...layout}
        name="category"
        initialValues={{ remember: true }}
        layout={"vertical"}
        form={form}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input name!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={5} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
