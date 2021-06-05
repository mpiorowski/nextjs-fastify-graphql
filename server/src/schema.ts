import { gql } from "apollo-server-fastify";

export const schema = gql`
  type Query {
    hello: String
    categories: [Category]
    category(id: String): Category
    topic(id: String): Topic
  }

  type Mutation {
    createCategory(title: String, description: String): Category
    createTopic(categoryId: String, title: String, description: String): Topic
    createPost(topicId: String, content: String, replyId: String): Post
    createChat(content: String): Chat
  }

  type Subscription {
    newestChat: Chat
  }

  type Category {
    id: String
    title: String
    description: String
    postsCount: Int
    topics: [Topic]
  }

  type Topic {
    id: String
    title: String
    description: String
    posts: [Post]
  }

  type Post {
    id: String
    content: String
    replies: [Post]
    replyId: String
  }

  type Chat {
    id: String
    content: String
  }

  type User {
    id: String
    email: String
    name: String
  }
`;
