export const schema = `
  type Query {
    hello: String
    categories: [Category]
    category(id: String): Category
  }
  
  type Mutation {
    createCategory(title: String, description: String): Category
    createTopic(categoryid: String, title: String, description: String): Topic
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
  }
  `;
