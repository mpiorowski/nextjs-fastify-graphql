export const schema = `
  type Query {
    hello: String
    categories: [Category]
    category(id: String): Category
    topic(id: String): Topic
  }
  
  type Mutation {
    createCategory(title: String, description: String): Category
    createTopic(categoryId: String, title: String, description: String): Topic
    createPost(categoryId: String, topicId: String, content: String, replyid: String): Post
  }
  
  type Category {
    id: String
    title: String
    description: String
    topics: [Topic]
  }

  type Topic {
    id: String
    title: String
    description: String
    postsCount: Int
    posts: [Post]
  }

  type Post {
    id: String
    content: String
    reply: Post
    replyid: String
  }
  `;
