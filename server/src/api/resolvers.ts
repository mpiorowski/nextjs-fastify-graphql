import { IResolvers } from 'mercurius';
import { getAllCategories, getCategoryById, addCategory, addTopic } from './categories';

export const resolvers: IResolvers = {
  Query: {
    hello: () => 'Witam',
    categories: async () => await getAllCategories(),
    category: async (_: unknown, { id }: { id: string }) => {
      await getCategoryById(id);
    },
  },
  Mutation: {
    createCategory: async (_: unknown, data: { title: string; description: string }) => await addCategory(data),
    createTopic: async (_: unknown, data: { title: string; description: string; categoryid: number }) => await addTopic(data),
  },
};
