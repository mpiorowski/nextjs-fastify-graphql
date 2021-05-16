import { gql, request } from 'graphql-request';
import { useQuery } from 'react-query';
import { CONFIG } from '../../../@common/@enums';
import { Category, Topic } from './forumTypes';

export function useFindAllCategories() {
  const { data, isLoading, isError } = useQuery('categories', apiFindAllCategories);
  const categoryData = data?.categories || [];
  return { categoryData, isLoading, isError };
}
export const apiFindAllCategories = (): Promise<{ categories: Category[] }> => {
  return request(
    CONFIG.API_URL,
    gql`
      query {
        categories {
          id
          title
          description
        }
      }
    `
  );
};

export function useFindCategoryById(categoryId: string) {
  const { data, isLoading, isError } = useQuery(['category', categoryId], () => apiFindCategoryById(categoryId), { enabled: !!categoryId });
  const categoryData = data?.category || null;
  return { categoryData, isLoading, isError };
}
export const apiFindCategoryById = (catergoryId: string): Promise<{ category: Category }> => {
  const variables = {
    catergoryId: String(catergoryId),
  };
  const query = gql`
    query category($catergoryId: String) {
      category(id: $catergoryId) {
        id
        title
        description
        topics {
          id
          title
          description
          postsCount
        }
      }
    }
  `;

  return request(CONFIG.API_URL, query, variables);
};

export const apiAddCategory = (category: Category) => {
  const variables = {
    title: category.title,
    description: category.description,
  };
  const query = gql`
    mutation createCategory($title: String, $description: String) {
      createCategory(title: $title, description: $description) {
        title
        description
      }
    }
  `;
  return request(CONFIG.API_URL, query, variables);
};

export const apiAddTopic = (topic: Topic) => {
  const variables = {
    categoryId: topic.categoryId,
    title: topic.title,
    description: topic.description,
  };
  const query = gql`
    mutation createTopic($categoryId: String, $title: String, $description: String) {
      createTopic(categoryId: $categoryId, title: $title, description: $description) {
        title
        description
      }
    }
  `;
  return request(CONFIG.API_URL, query, variables);
};
