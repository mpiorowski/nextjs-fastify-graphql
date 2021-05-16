import { IResolvers } from 'mercurius';
import { addCategory, getAllCategories, getCategoryById } from './db/categories.db';
import { addPost } from './db/posts.db';
import { addTopic, getTopicById } from './db/topics.db';

export const resolvers: IResolvers = {
  Query: {
    hello: () => 'Witam',
    categories: async () => await getAllCategories(),
    category: async (_: unknown, { id }: { id: string }) => await getCategoryById(id),
    topic: async (_: unknown, { id }: { id: string }) => await getTopicById(id),
  },
  Mutation: {
    createCategory: async (_: unknown, data: { title: string; description: string }, context) => await addCategory(data, context),
    createTopic: async (_: unknown, data: { categoryId: string; title: string; description: string }, context) => await addTopic(data, context),
    createPost: async (_: unknown, data: { topicId: string; content: string; replyId: string }, context) => await addPost(data, context),
  },
};