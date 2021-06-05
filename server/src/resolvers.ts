import { IResolvers, PubSub } from "apollo-server-fastify";
import { Chat } from "../../@types/chat.types";
import { Category, Post, Topic } from "../../@types/forum.types";
import { addCategory, countAllPostsByCategoryId, getAllCategories, getCategoryById } from "./db/categories.db";
import { addChat } from "./db/chat.db";
import { addPost, getAllPostsByTopicId, getAllRepliesByPostId } from "./db/posts.db";
import { addTopic, getAllTopicsByCategoryId, getTopicById } from "./db/topics.db";

const pubsub = new PubSub();

export const resolvers: IResolvers = {
  Query: {
    hello: () => "Witam",
    categories: async (_parent, _args, context) => await getAllCategories(context),
    category: async (_: unknown, { id }: { id: string }) => await getCategoryById(id),
    topic: async (_: unknown, { id }: { id: string }) => await getTopicById(id),
  },
  Mutation: {
    createCategory: async (_: unknown, data: Category, context) => await addCategory(data, context),
    createTopic: async (_: unknown, data: Topic, context) => await addTopic(data, context),
    createPost: async (_: unknown, data: Post, context) => await addPost(data, context),
    createChat: async (_: unknown, data: Chat, context) => {
      const response = await addChat(data, context);
      pubsub.publish("LAST_CHAT", { newestChat: response });
      return response;
    },
  },

  Category: {
    async topics(parent: Category): Promise<unknown> {
      return await getAllTopicsByCategoryId(parent.id as string);
    },
    async postsCount(parent: Category): Promise<unknown> {
      return await countAllPostsByCategoryId(parent.id as string);
    },
  },
  Topic: {
    async posts(parent: Topic): Promise<unknown> {
      return await getAllPostsByTopicId(parent.id as string);
    },
  },
  Post: {
    async replies(parent: Post): Promise<unknown> {
      return await getAllRepliesByPostId(parent.id as string);
    },
  },

  Subscription: {
    newestChat: {
      subscribe: () => pubsub.asyncIterator(["LAST_CHAT"]),
    },
  },
};
