import { useMemo } from "react";
import { gql, useMutation, useQuery } from "urql";
import { Category } from "../../../../../@types/forum.types";
import { GraphqlResponse } from "../../../@common/@types";

export function useFindAllCategories(): GraphqlResponse<Category[]> {
  const query = gql`
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
  const [result, reexecuteQuery] = useQuery({ query });
  const { data, fetching, error } = result;
  const response = data?.categories || [];
  return { response, fetching, error, reexecuteQuery };
}

export function useFindCategoryById(categoryId: string): GraphqlResponse<Category | null> {
  const query = gql`
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
  const context = useMemo(() => ({ additionalTypenames: ["Topic"] }), []);
  const [result, reexecuteQuery] = useQuery({ query, context, variables: { categoryId } });
  const { data, fetching, error } = result;
  const response = data?.category || null;
  return { response, fetching, error, reexecuteQuery };
}

export const useAddCategory = (): GraphqlResponse<Category> => {
  const query = gql`
    mutation CreateCategory($title: String, $description: String) {
      createCategory(title: $title, description: $description) {
        id
        title
        description
      }
    }
  `;
  const [result, mutate] = useMutation(query);
  const { data: response, fetching, error } = result;
  return { mutate, response, fetching, error };
};
