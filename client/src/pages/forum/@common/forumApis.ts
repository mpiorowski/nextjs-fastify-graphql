import { useQuery } from 'react-query';
import { apiRequest } from '../../../@common/@apiRequest';
import { CONFIG } from '../../../@common/@enums';
import { Category, Post, Topic } from './forumTypes';

const apiFindAllCategories = (): Promise<{ data: { categories: Category[] } }> => {
  const query = `query { categories { id title description } }`;
  return apiRequest({ url: `${CONFIG.API_URL}?query=${query}`, method: 'GET' });
};
export function useFindAllCategories() {
  const { data, isLoading, isError } = useQuery('categories', apiFindAllCategories);
  const categoryData = data?.data.categories || [];
  return { categoryData, isLoading, isError };
}

const apiFindCategoryById = (categoryId: string): Promise<{ data: { category: Category } }> => {
  const query = `query { category(id: "${categoryId}") { id title description topics { id title description postsCount} } }`;
  return apiRequest({ url: `${CONFIG.API_URL}?query=${query}`, method: 'GET' });
};
export function useFindCategoryById(categoryId: string) {
  const { data, isLoading, isError } = useQuery(['category', categoryId], () => apiFindCategoryById(categoryId), { enabled: !!categoryId });
  const categoryData = data?.data.category || null;
  return { categoryData, isLoading, isError };
}

export const apiAddCategory = (category: Category): Promise<Category & { errors: Error[] }> => {
  const query = `
  mutation {
    createCategory(title: "${category.title}", description: "${category.description}") {
      title, description, id
    }
  }
  `;
  return apiRequest({ url: `${CONFIG.API_URL}`, method: 'POST', body: JSON.stringify({ query: query }) });
};

const apiFindTopicyById = (topicId: string): Promise<{ data: { topic: Topic } }> => {
  const query = `
  query {
    topic(id: "${topicId}") {
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
  return apiRequest({ url: `${CONFIG.API_URL}?query=${query}`, method: 'GET' });
};
export function useFindTopicById(topicId: string) {
  const { data, isLoading, isError } = useQuery(['topic', topicId], () => apiFindTopicyById(topicId), { enabled: !!topicId });
  const topicData = data?.data.topic;
  return { topicData, isLoading, isError };
}

export const apiAddTopic = (topic: Topic): Promise<Topic & { errors: Error[] }> => {
  const query = `
  mutation {
    createTopic(categoryId: "${topic.categoryId}", title: "${topic.title}", description: "${topic.description}") {
      title, description, id
    }
  }
  `;
  return apiRequest({ url: `${CONFIG.API_URL}`, method: 'POST', body: JSON.stringify({ query: query }) });
};

export const apiAddPost = (post: Post) => {
  const query = `
  mutation {
    createPost(topicId: "${post.topicId}", content: "${post.content}") {
      content, id
    }
  }
  `;
  return apiRequest({ url: `${CONFIG.API_URL}`, method: 'POST', body: JSON.stringify({ query: query }) });
};
