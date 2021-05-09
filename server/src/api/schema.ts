export const schema = `
  type Query {
    hello: String
    categories: [Category]
    category(id: String!): Category
  }
  
  type Mutation {
    createCategory(title: String, description: String): Category
    createTopic(title: String, description: String, categoryid: Int): Topic
  }
  
  type Category {
    id: String
    title: String
    description: String
    posts: [Topic]
  }

  type Topic {
    id: String
    title: String
    description: String
  }

  `;
