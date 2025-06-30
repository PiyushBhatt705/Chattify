const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000/api";

export const API = {
  AUTH: {
    REGISTER: `${BASE_URL}/auth/register`,
    LOGIN: `${BASE_URL}/auth/login`,
    GET_ME: `${BASE_URL}/auth/me`,
  },

  USERS: {
    ALL: `${BASE_URL}/users`,
    GET_ONE: (id: string) => `${BASE_URL}/users/${id}`,
  },

  CHATS: {
    CREATE: `${BASE_URL}/chats`,
    GET_ALL: `${BASE_URL}/chats`,
    GET_ONE: (chatId: string) => `${BASE_URL}/chats/${chatId}`,
    ADD_TO_GROUP: `${BASE_URL}/chats/group/add`,
    REMOVE_FROM_GROUP: `${BASE_URL}/chats/group/remove`,
  },

  MESSAGES: {
    SEND: `${BASE_URL}/messages`,
    GET_ALL: (chatId: string) => `${BASE_URL}/messages/${chatId}`,
    MARK_AS_SEEN: (chatId: string) => `${BASE_URL}/messages/${chatId}/seen`,
  },
};
