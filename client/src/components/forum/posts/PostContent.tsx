import { Avatar, Comment } from "antd";
import React from "react";
import { Post } from "../../../pages/forum/@common/forumTypes";

interface Props {
  post: Post;
}

export const PostContent = ({ post }: Props) => {
  return (
    <div>
      <Comment
        // actions={actions}
        author={<a>Han Solo</a>}
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
        content={
          <p>
            {post.content}
          </p>
        }
        // datetime={
          // <Tooltip title={"moment().format("YYYY-MM-DD HH:mm:ss")"}>
          //   <span>{moment().fromNow()}</span>
          // </Tooltip>
        // }
      />
    </div>
  );
};
