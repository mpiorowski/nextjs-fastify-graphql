import { Button, List } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { apiFindAllPosts } from "../../../pages/forum/@common/forumApis";
import { Post, Topic } from "../../../pages/forum/@common/forumTypes";
import { PostContent } from "./PostContent";
import { PostDrawer } from "./PostDrawer";

interface Props {
  categoryUid: string;
  topic: Topic;
  posts: Post[];
}

export const PostsList = ({ categoryUid, topic, posts }: Props) => {
  const { data } = useQuery(["posts", topic.uid], () => apiFindAllPosts(categoryUid, topic.uid), {
    initialData: posts,
  });

  const [drawerVisibility, setDrawerVisibility] = useState(false);
  return (
    <div>
      <Button onClick={() => setDrawerVisibility(true)}>Add post</Button>
      <List
        locale={{ emptyText: "Brak wpisów" }}
        // loading={loading}
        // header={header}
        dataSource={data}
        pagination={{
          position: "both",
          size: "small",
          // pageSize: pageSize,
          // total: initialPost.length,
          // current: currentPage,
          // onChange: onPaginationChange,
        }}
        renderItem={(post) => (
          <li>
            {/* {post.content} */}
            <PostContent post={post}></PostContent>
          </li>
        )}
      ></List>
      <PostDrawer
        categoryUid={categoryUid}
        topicUid={topic.uid}
        drawerVisibility={drawerVisibility}
        setDrawerVisibility={setDrawerVisibility}
      ></PostDrawer>
    </div>
  );
};
