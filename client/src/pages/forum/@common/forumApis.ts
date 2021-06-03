import { useQuery } from "react-query";
import { Category, Post, Topic } from "../../../../../@types/forum.types";
import { apiRequest } from "../../../@common/@apiRequest";

export function useFindAllCategories(): {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
} {
  const query = `query { categories { id title description postsCount topics { title } } }`;
  const { data, isLoading, isError } = useQuery("categories", () =>
    apiRequest<{ data: { categories: Category[] } }>({ url: `/api/graphql?query=${query}`, method: "GET" }),
  );
  const categories = data?.data.categories || [];
  return { categories, isLoading, isError };
}

export function useFindCategoryById(categoryId: string): {
  categoryData: Category;
  isLoading: boolean;
  isError: boolean;
} {
  const query = `query { category(id: "${categoryId}") { id title description topics { id title description posts { id replies { id } } } } }`;
  const { data, isLoading, isError } = useQuery(
    ["category", categoryId],
    () => apiRequest<{ data: { category: Category } }>({ url: `/api/graphql?query=${query}`, method: "GET" }),
    {
      enabled: !!categoryId,
    },
  );
  const categoryData = data?.data.category || null;
  return { categoryData, isLoading, isError };
}

export const apiAddCategory = (category: Category): Promise<Category & { errors: Error[] }> => {
  const query = `
  mutation {
    createCategory(title: "${category.title}", description: "${category.description}") {
      title, description, id
    }
  }
  `;
  return apiRequest({ url: `/api/graphql`, method: "POST", body: JSON.stringify({ query: query }) });
};

export function useFindTopicById(topicId: string): {
  topic: Topic;
  isLoading: boolean;
  isError: boolean;
} {
  const query = `
  query {
    topic(id: "${topicId}") {
      id
      title
      description
      posts {
        id
        content
        replies {
          id
          content
        }
      }
    }
  }
  `;
  const { data, isLoading, isError } = useQuery(
    ["topic", topicId],
    () => apiRequest<{ data: { topic: Topic } }>({ url: `/api/graphql?query=${query}`, method: "GET" }),
    {
      enabled: !!topicId,
    },
  );
  const topic = data?.data.topic;
  return { topic, isLoading, isError };
}

export const apiAddTopic = (topic: Topic): Promise<Topic & { errors: Error[] }> => {
  const query = `
  mutation {
    createTopic(categoryId: "${topic.categoryId}", title: "${topic.title}", description: "${topic.description}") {
      title, description, id
    }
  }
  `;
  return apiRequest({ url: `/api/graphql`, method: "POST", body: JSON.stringify({ query: query }) });
};

export const apiAddPost = (post: Post): Promise<Post & { errors: Error[] }> => {
  const query = `
  mutation {
    createPost(topicId: "${post.topicId}", content: "${post.content}", replyId: ${
    post.replyId ? `"${post.replyId}"` : null
  }) {
      content, id
    }
  }
  `;
  return apiRequest({ url: `/api/graphql`, method: "POST", body: JSON.stringify({ query: query }) });
};
