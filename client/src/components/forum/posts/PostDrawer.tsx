import { Button, Drawer, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { apiRequest } from "../../../@common/apiRequest";
import { Post, Topic } from "../../../pages/forum/@common/forumTypes";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface Props {
  categoryUid: string;
  topicUid: string;
  drawerVisibility: boolean;
  setDrawerVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

export const apiAddPost = (categoryUid: string, topicUid: string, post: Post) => {
  return apiRequest<Topic>({
    url: "http://localhost:3000/api/categories/" + categoryUid + "/topics/" + topicUid + "/posts",
    method: "POST",
    body: JSON.stringify(post),
  });
};

export const PostDrawer = ({ drawerVisibility, setDrawerVisibility, topicUid, categoryUid }: Props) => {
  const cache = useQueryClient();
  const [form] = Form.useForm();

  const addPost = useMutation((post: Post) => apiAddPost(categoryUid, topicUid, post), {
    onSuccess: async () => {
      cache.refetchQueries(["posts", topicUid]);
      setDrawerVisibility(false);
    },
  });

  const onSubmit = () => {
    form
      .validateFields()
      .then((values: Post) => {
        addPost.mutate(values);
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
        <Form.Item label="Content" name="content">
          <TextArea rows={5} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
