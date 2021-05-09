import { GetStaticProps } from 'next';
import React from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { apiFindAllCategories } from './@common/forumApis';
import { CategoryList } from './CategoryList';
import { Navigation } from '../@common/Navigation';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('categories', apiFindAllCategories);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Categories() {
  return (
    <Navigation>
      <CategoryList></CategoryList>
    </Navigation>
  );
}
