// app/register.tsx
import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import Toast from 'react-native-toast-message';

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill out all the fields.',
      });
      return;
    }

    const success = await register(name, email, password);
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'You can now log in!',
      });
      router.replace('/');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: 'Email might already be taken.',
      });
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black px-6">
      <Text className="text-white text-3xl font-bold mb-8">Create Account 🚀</Text>

      <TextInput
        className="w-full border border-gray-700 bg-gray-900 text-white rounded-2xl px-4 py-3 mb-4"
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

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
        onPress={handleRegister}
        className="bg-violet-600 w-full rounded-2xl py-3 mb-3 active:opacity-80"
      >
        <Text className="text-white text-center text-lg font-semibold">Register</Text>
      </Pressable>

      <Text className="text-gray-400 mt-3">
        Already have an account?{' '}
        <Text onPress={() => router.push('/login')} className="text-violet-400">
          Login
        </Text>
      </Text>
    </View>
  );
}
