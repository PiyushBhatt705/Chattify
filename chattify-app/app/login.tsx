// app/login.tsx
import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import Toast from 'react-native-toast-message';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter both email and password.',
      });
      return;
    }

    const success = await login(email, password);
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });
      router.replace('/');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Invalid email or password.',
      });
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black px-6">
      <Text className="text-white text-3xl font-bold mb-8">Welcome Back 👋</Text>

      <TextInput
        className="w-full border border-gray-700 bg-gray-900 text-white rounded-2xl px-4 py-3 mb-4"
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        className="w-full border border-gray-700 bg-gray-900 text-white rounded-2xl px-4 py-3 mb-4"
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        onPress={handleLogin}
        className="bg-violet-600 w-full rounded-2xl py-3 mb-3 active:opacity-80"
      >
        <Text className="text-white text-center text-lg font-semibold">Login</Text>
      </Pressable>

      <Text className="text-gray-400 mt-3">
        Don't have an account?{' '}
        <Text onPress={() => router.push('/register')} className="text-violet-400">
          Register
        </Text>
      </Text>
    </View>
  );
}
