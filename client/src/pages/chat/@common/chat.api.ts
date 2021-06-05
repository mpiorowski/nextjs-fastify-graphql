import { gql, useMutation, useSubscription, UseSubscriptionState } from "urql";
import { Chat } from "../../../../../@types/chat.types";
import { GraphqlResponse } from "../../../@common/@types";

export function useChatSubscription(): {
  res: UseSubscriptionState;
} {
  const query = gql`
    subscription {
      newestChat {
        id
        content
      }
    }
  `;

  const [res] = useSubscription({ query });
  return { res };
}

export const useAddChat = (): GraphqlResponse<Chat> => {
  const query = gql`
    mutation ($content: String!) {
      createChat(content: $content) {
        id
        content
      }
    }
  `;
  const [result, mutate] = useMutation(query);
  const { data: response, fetching, error } = result;
  return { mutate, response, fetching, error };
};
