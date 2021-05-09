import { GetStaticProps } from "next";
import React from "react";
import { PostsList } from "../../../../../../components/forum/posts/PostsList";
import { Category, Post, Topic } from "../../../../@common/forumTypes";
import AppLayout from "../../../../../../components/_common/AppLayout";
import { categoriesApi } from "../../../../../api/categories.api";
import { topicsApi } from "../../../../../api/categories/[categoryId]/topics";
import { topicApi } from "../../../../../api/categories/[categoryId]/topics/[topicUid]";
import { postsApi } from "../../../../../api/categories/[categoryId]/topics/[topicUid]/posts";

export async function getStaticPaths() {
  let paths = [];
  const categoriesData = await categoriesApi("GET");
  const categories: Category[] = JSON.parse(categoriesData);

  await Promise.all(
    categories.map(async (category) => {
      const topicData = await topicsApi(category.uid, "GET");
      const topics: Topic[] = JSON.parse(topicData);
      const newPaths = topics.map((topic) => ({
        params: { categoryUid: category.uid, topicUid: topic.uid },
      }));
      paths = paths.concat(newPaths);
    })
  );
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { categoryUid, topicUid } = params;
  const topicData = await topicApi(topicUid as string, "GET");
  const topic: Topic = JSON.parse(topicData)[0];
  const postsData = await postsApi(params.topicUid as string, "GET");
  const posts: Post[] = JSON.parse(postsData);
  return { props: { categoryUid, topic, posts } };
};

type Props = {
  categoryUid: string;
  topic: Topic;
  posts: Post[];
};

export const Topics = ({ categoryUid, topic, posts }: Props) => {
  return (
    <AppLayout>
      <PostsList categoryUid={categoryUid} topic={topic} posts={posts}></PostsList>
    </AppLayout>
  );
};

export default Topics;
