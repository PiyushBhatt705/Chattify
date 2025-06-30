import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { loginUser } from '../lib/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Toast.show({ type: 'error', text1: 'Please fill in all fields' });
    }

    try {
      setLoading(true);
      const data = await loginUser(email, password);
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      Toast.show({ type: 'success', text1: 'Logged in successfully!' });
      router.replace('/');
    } catch (err: any) {
      Toast.show({ type: 'error', text1: err.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-black/60">
      <Animated.View entering={FadeInDown} className="items-center mb-8">
        <Image source={require('../assets/logo.png')} className="w-24 h-24 mb-4" resizeMode="contain" />
        <Text className="text-3xl font-bold text-light">Welcome Back</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(100)}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          className="bg-white/10 text-white p-4 mb-4 rounded-2xl border border-white/20"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="bg-white/10 text-white p-4 mb-6 rounded-2xl border border-white/20"
        />

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className="bg-accent py-4 rounded-2xl active:opacity-90"
        >
          <Text className="text-center text-white font-bold text-lg">
            {loading ? 'Logging In...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/register')}
          className="mt-4"
        >
          <Text className="text-center text-accent">Don't have an account? Register</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
