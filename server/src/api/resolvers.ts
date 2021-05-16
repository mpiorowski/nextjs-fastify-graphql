import { IResolvers } from 'mercurius';
import { getAllCategories, getCategoryById, addCategory } from './categories';
import { addPost } from './posts';
import { addTopic, getTopicById } from './topics';

export const resolvers: IResolvers = {
  Query: {
    hello: () => 'Witam',
    categories: async () => await getAllCategories(),
    category: async (_: unknown, { id }: { id: string }) => await getCategoryById(id),
    topic: async (_: unknown, { id }: { id: string }) => await getTopicById(id),
  },
  Mutation: {
    createCategory: async (_: unknown, data: { title: string; description: string }) => await addCategory(data),
    createTopic: async (_: unknown, data: { categoryId: string; title: string; description: string }) => await addTopic(data),
    createPost: async (_: unknown, data: { categoryId: string; topicId: string; content: string; replyId: string }) => await addPost(data),
  },
};
