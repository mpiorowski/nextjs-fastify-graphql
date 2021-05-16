import { gql, request } from 'graphql-request';
import { useQuery } from 'react-query';
import { CONFIG } from '../../../@common/@enums';
import { Category, Post, Topic } from './forumTypes';

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
export const apiFindCategoryById = (categoryId: string): Promise<{ category: Category }> => {
  const variables = {
    categoryId: String(categoryId),
  };
  const query = gql`
    query category($categoryId: String) {
      category(id: $categoryId) {
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

export function useFindTopicById(topicId: string) {
  const { data, isLoading, isError } = useQuery(['topic', topicId], () => apiFindTopicyById(topicId), { enabled: !!topicId });
  const topicData = data?.topic;
  return { topicData, isLoading, isError };
}
export const apiFindTopicyById = (topicId: string): Promise<{ topic: Topic }> => {
  const variables = {
    topicId: String(topicId),
  };
  const query = gql`
    query topic($topicId: String) {
      topic(id: $topicId) {
        id
        title
        description
        posts {
          id
          content
        }
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

export const apiAddPost = (post: Post) => {
  const variables = {
    topicId: post.topicId,
    content: post.content,
  };
  const query = gql`
    mutation createPost($topicId: String, $content: String) {
      createPost(topicId: $topicId, content: $content) {
        content
      }
    }
  `;
  return request(CONFIG.API_URL, query, variables);
};
