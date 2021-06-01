import { IResolvers } from "mercurius";
import { Chat } from "../../@types/chat.types";
import { Category, Post, Topic } from "../../@types/forum.types";
import { addCategory, countAllPostsByCategoryId, getAllCategories, getCategoryById } from "./db/categories.db";
import { addChat } from "./db/chat.db";
import { addPost, getAllPostsByTopicId, getAllRepliesByPostId } from "./db/posts.db";
import { addTopic, getAllTopicsByCategoryId, getTopicById } from "./db/topics.db";

export const resolvers: IResolvers = {
  Query: {
    hello: () => "Witam",
    categories: async (_: unknown, _data: null, context) => await getAllCategories(context),
    category: async (_: unknown, { id }: { id: string }) => await getCategoryById(id),
    topic: async (_: unknown, { id }: { id: string }) => await getTopicById(id),
  },
  Mutation: {
    createCategory: async (_: unknown, data: Category, context) => await addCategory(data, context),
    createTopic: async (_: unknown, data: Topic, context) => await addTopic(data, context),
    createPost: async (_: unknown, data: Post, context) => await addPost(data, context),
    createChat: async (_: unknown, data: Chat, context) => {
      const response = await addChat(data, context);
      const { pubsub } = context;
      pubsub.publish({
        topic: "LAST_CHAT",
        payload: {
          newestChat: response,
        },
      });
      return response;
    },
  },
  Subscription: {
    newestChat: {
      subscribe: async (_root, _args, { pubsub }) => await pubsub.subscribe("LAST_CHAT"),
    },
  },
};

export const loaders = {
  Category: {
    async topics(queries: { obj: Category }[]): Promise<unknown> {
      return queries.map(async ({ obj }: { obj: Category }) => await getAllTopicsByCategoryId(obj.id as string));
    },
    async postsCount(queries: { obj: Category }[]): Promise<unknown> {
      return queries.map(async ({ obj }: { obj: Category }) => await countAllPostsByCategoryId(obj.id as string));
    },
  },
  Topic: {
    async posts(queries: { obj: Topic }[]): Promise<unknown> {
      return queries.map(async ({ obj }: { obj: Topic }) => await getAllPostsByTopicId(obj.id as string));
    },
  },
  Post: {
    async replies(queries: { obj: Post }[]): Promise<unknown> {
      return queries.map(async ({ obj }: { obj: Post }) => await getAllRepliesByPostId(obj.id as string));
    },
  },
};
