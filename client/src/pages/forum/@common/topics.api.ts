import { useMemo } from "react";
import { gql, useMutation, useQuery } from "urql";
import { Topic } from "../../../../../@types/forum.types";
import { handleGQLError } from "../../../@common/@handleError";
import { GraphqlResponse } from "../../../@common/@types";

export function useFindTopicById(topicId: string): GraphqlResponse<Topic> {
  const query = gql`
    query ($topicId: String!) {
      topic(id: $topicId) {
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

  const context = useMemo(() => ({ additionalTypenames: ["Post"] }), []);
  const [result, reexecuteQuery] = useQuery({ query, variables: { topicId }, pause: !topicId, context });
  const { data, fetching, error } = result;
  if (error) {
    handleGQLError(error);
  }
  const response = data?.topic || [];
  return { response, fetching, error, reexecuteQuery };
}

export const useAddTopic = (): GraphqlResponse<Topic> => {
  const query = gql`
    mutation ($categoryId: String!, $title: String!, $description: String!) {
      createTopic(categoryId: $categoryId, title: $title, description: $description) {
        title
        description
        id
      }
    }
  `;
  const [result, mutate] = useMutation(query);
  const { data: response, fetching, error } = result;
  return { mutate, response, fetching, error };
};
