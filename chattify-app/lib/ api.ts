import axios from 'axios';
import { User } from '@/context/authContext';

export const API_BASE_URL = 'http://localhost:5000/api'; // ✅ Change to deployed URL if needed

const createAuthHeaders = (user: User) => ({
  headers: {
    Authorization: `Bearer ${user.token}`,
  },
});

// ✅ AUTH
export const loginUser = async (email: string, password: string) => {
  const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  return data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  avatar?: { uri: string; type: string; name: string }
) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  if (avatar) {
    formData.append('avatar', {
      uri: avatar.uri,
      type: avatar.type,
      name: avatar.name,
    } as any);
  }

  const { data } = await axios.post(`${API_BASE_URL}/auth/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// ✅ USERS
export const searchUsers = async (query: string, user: User) => {
  const { data } = await axios.get(`${API_BASE_URL}/users?search=${query}`, createAuthHeaders(user));
  return data;
};

// ✅ CHATS
export const accessChat = async (userId: string, user: User) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/chat`,
    { userId },
    createAuthHeaders(user)
  );
  return data;
};

export const createGroupChat = async (
  name: string,
  userIds: string[],
  user: User
) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/chat/group`,
    {
      name,
      users: userIds,
    },
    createAuthHeaders(user)
  );
  return data;
};

export const renameGroup = async (
  chatId: string,
  chatName: string,
  user: User
) => {
  const { data } = await axios.put(
    `${API_BASE_URL}/chat/rename`,
    {
      chatId,
      chatName,
    },
    createAuthHeaders(user)
  );
  return data;
};

export const addToGroup = async (
  chatId: string,
  userId: string,
  user: User
) => {
  const { data } = await axios.put(
    `${API_BASE_URL}/chat/groupadd`,
    {
      chatId,
      userId,
    },
    createAuthHeaders(user)
  );
  return data;
};

export const removeFromGroup = async (
  chatId: string,
  userId: string,
  user: User
) => {
  const { data } = await axios.put(
    `${API_BASE_URL}/chat/groupremove`,
    {
      chatId,
      userId,
    },
    createAuthHeaders(user)
  );
  return data;
};

// ✅ MESSAGES
export const sendMessage = async (
  content: string,
  chatId: string,
  user: User
) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/message`,
    { content, chatId },
    createAuthHeaders(user)
  );
  return data;
};

export const fetchMessages = async (chatId: string, user: User) => {
  const { data } = await axios.get(
    `${API_BASE_URL}/message/${chatId}`,
    createAuthHeaders(user)
  );
  return data;
};

export const markAsSeen = async (chatId: string, user: User) => {
  const { data } = await axios.put(
    `${API_BASE_URL}/message/seen/${chatId}`,
    {},
    createAuthHeaders(user)
  );
  return data;
};
