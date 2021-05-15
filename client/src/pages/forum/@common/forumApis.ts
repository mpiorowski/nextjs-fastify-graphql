import { CONFIG, REST } from '../../../@common/@enums';
import { apiRequest } from '../../../@common/@apiRequest';
import { Category, Post, Topic } from './forumTypes';
import { request, gql } from 'graphql-request';
import { useQuery } from 'react-query';

export function useCategories() {
  return useQuery('categories', apiFindAllCategories);
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

export const apiFindCategoryById = (catergoryId: string) => {
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

export const apiFindAllTopics = (catergoryId: string | string[]) => {
  return apiRequest<Topic[]>({
    url: 'http://localhost:3000/api/categories/' + catergoryId + '/topics',
    method: REST.GET,
  });
};

export const apiFindAllPosts = (catergoryId: string | string[], topicUid: string | string[]) => {
  return apiRequest<Post[]>({
    url: 'http://localhost:3000/api/categories/' + catergoryId + '/topics/' + topicUid + '/posts',
    method: REST.GET,
  });
};
