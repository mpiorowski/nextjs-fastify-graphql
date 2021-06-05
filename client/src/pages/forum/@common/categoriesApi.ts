import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { Category, Post, Topic } from "../../../../../@types/forum.types";
import { apiRequest } from "../../../@common/@apiRequest";

export function useFindAllCategories(): {
  categories: Category[];
  loading: boolean;
  error: ApolloError;
  refetch: () => void;
} {
  const CATEGORIES_GQL = gql`
    query {
      categories {
        id
        title
        description
        postsCount
        topics {
          title
        }
      }
    }
  `;
  const { data, loading, error, refetch } = useQuery(CATEGORIES_GQL);
  const categories = data?.categories || [];
  return { categories, loading, error, refetch };
}

export function useFindCategoryById(categoryId: string): {
  categoryData: Category | null;
  loading: boolean;
  error?: ApolloError;
} {
  const CATEGORY_QUERY = gql`
    query Category($categoryId: String!) {
      category(id: $categoryId) {
        id
        title
        description
        topics {
          id
          title
          description
          posts {
            id
            replies {
              id
            }
          }
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(CATEGORY_QUERY, { variables: { categoryId }, skip: !categoryId });
  const categoryData = data?.category || null;
  return { categoryData, loading, error };
}

export const ADD_CATEGORY_GQL = gql`
  mutation CreateCategory($title: String, $description: String) {
    createCategory(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;
export const useAddCategory = () => {
  const [mutate, { loading, error, data }] = useMutation(ADD_CATEGORY_GQL);
  return { mutate, loading, error, data };
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
    () => apiRequest<{ data: { topic: Topic } }>({ url: `/api/proxy/graphql?query=${query}`, method: "GET" }),
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
  return apiRequest({ url: `/api/proxy/graphql`, method: "POST", body: JSON.stringify({ query: query }) });
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
  return apiRequest({ url: `/api/proxy/graphql`, method: "POST", body: JSON.stringify({ query: query }) });
};
