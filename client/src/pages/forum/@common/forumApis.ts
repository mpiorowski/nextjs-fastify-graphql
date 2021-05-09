import { REST } from '../../../@common/@enums';
import { apiRequest } from '../../../@common/apiRequest';
import { Category, Post, Topic } from './forumTypes';

export const apiFindAllCategories = () => {
  return apiRequest<Category[]>({
    url: 'http://localhost:3000/api/categories',
    method: REST.GET,
  });
};

export const apiFindCategoryById = (catergoryId: string | string[]) => {
  return apiRequest<Category>({
    url: 'http://localhost:3000/api/categories/' + catergoryId,
    method: REST.GET,
  });
};

export const apiAddCategory = (category: Category) => {
  return apiRequest<Category>({
    url: 'http://localhost:3000/api/categories',
    method: REST.POST,
    body: JSON.stringify(category),
  });
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
