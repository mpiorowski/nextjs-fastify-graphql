import { gql, useMutation } from "urql";
import { Post } from "../../../../../@types/forum.types";
import { GraphqlResponse } from "../../../@common/@types";

export const useAddPost = (): GraphqlResponse<Post> => {
  const query = gql`
    mutation ($topicId: String!, $content: String!, $replyId: String) {
      createPost(topicId: $topicId, content: $content, replyId: $replyId) {
        content
        id
      }
    }
  `;
  const [result, mutate] = useMutation(query);
  const { data: response, fetching, error } = result;
  return { mutate, response, fetching, error };
};
