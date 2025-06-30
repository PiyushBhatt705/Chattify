

/*
📁 app/register.tsx
*/
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { registerUser } from '../lib/api';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return Toast.show({ type: 'error', text1: 'All fields are required' });
    }

    try {
      setLoading(true);
      const data = await registerUser(name, email, password);
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      Toast.show({ type: 'success', text1: 'Registered successfully!' });
      router.replace('/');
    } catch (err: any) {
      Toast.show({ type: 'error', text1: err.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-black/60">
      <Animated.View entering={FadeInDown} className="items-center mb-8">
        <Image source={require('../assets/logo.png')} className="w-24 h-24 mb-4" resizeMode="contain" />
        <Text className="text-3xl font-bold text-light">Create Account</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(100)}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#94a3b8"
          value={name}
          onChangeText={setName}
          className="bg-white/10 text-white p-4 mb-4 rounded-2xl border border-white/20"
        />

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
          onPress={handleRegister}
          disabled={loading}
          className="bg-accent py-4 rounded-2xl active:opacity-90"
        >
          <Text className="text-center text-white font-bold text-lg">
            {loading ? 'Creating Account...' : 'Register'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
