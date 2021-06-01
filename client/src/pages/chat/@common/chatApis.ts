import { Chat } from "../../../../../@types/chat.types";
import { apiRequest } from "../../../@common/@apiRequest";

export const apiAddChat = (chat: Chat): Promise<Chat & { errors: Error[] }> => {
  const query = `
  mutation {
    createChat(content: "${chat.content}") {
      id, content
    }
  }
  `;
  return apiRequest({ url: `/api`, method: "POST", body: JSON.stringify({ query: query }) });
};
