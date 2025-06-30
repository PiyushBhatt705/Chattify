import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/context/authContext';

const USER_KEY = '@chattify_user';

export const storeUser = async (user: User) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Error storing user:', err);
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const userString = await AsyncStorage.getItem(USER_KEY);
    return userString ? JSON.parse(userString) : null;
  } catch (err) {
    console.error('Error getting user:', err);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (err) {
    console.error('Error removing user:', err);
  }
};
