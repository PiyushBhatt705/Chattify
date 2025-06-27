// lib/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://chattifybackend.onrender.com'; // Replace for deployment

export const registerUser = async (name: string, email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  await AsyncStorage.setItem('token', data.token);
  return data.user;
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  await AsyncStorage.setItem('token', data.token);
  return data.user;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem('token');
};

export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};
