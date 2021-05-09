import { GetStaticProps } from 'next';
import React from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { TopicsList } from '../../../../components/forum/topics/TopicsList';
import { Navigation } from '../../../@common/Navigation';
import { dbGetAllCategories } from '../../../api/categories.api';
import { apiFindAllTopics, apiFindCategoryById } from '../../@common/forumApis';

export async function getStaticPaths() {
  const categories = await dbGetAllCategories();
  const paths = categories.map((category) => ({
    params: { categoryId: category.uid },
  }));

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { categoryId } = params as { categoryId: string };
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['topics', categoryId], () => apiFindAllTopics(categoryId));
  await queryClient.prefetchQuery(['category', categoryId], () => apiFindCategoryById(categoryId));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const Topics = () => {
  return (
    <Navigation>
      <TopicsList></TopicsList>
    </Navigation>
  );
};

export default Topics;
