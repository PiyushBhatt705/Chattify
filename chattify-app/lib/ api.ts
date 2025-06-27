// lib/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://chattifybackend.onrender.com'; // Replace with your IP for real devices
import { API_BASE_URL as ENV_API } from "@env";

export const API_BASE_URL = ENV_API;

const getToken = async () => await AsyncStorage.getItem('token');

const headers = async () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${await getToken()}`,
});

export const getAllUsers = async () => {
  const res = await fetch(`${API_URL}/users`, {
    headers: await headers(),
  });
  return await res.json();
};

export const getChatMessages = async (chatId: string) => {
  const res = await fetch(`${API_URL}/messages/${chatId}`, {
    headers: await headers(),
  });
  return await res.json();
};

export const sendMessage = async (chatId: string, content: string) => {
  const res = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: await headers(),
    body: JSON.stringify({ chatId, content }),
  });
  return await res.json();
};

export const getGroupMessages = async (groupId: string) => {
  const res = await fetch(`${API_URL}/groups/${groupId}/messages`, {
    headers: await headers(),
  });
  return await res.json();
};
