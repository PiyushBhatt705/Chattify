/*
📁 app/profile.tsx
*/
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) setUser(JSON.parse(userData));
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    Toast.show({ type: 'success', text1: 'Logged out successfully!' });
    router.replace('/login');
  };

  if (!user) return null;

  return (
    <View className="flex-1 justify-center items-center px-6 bg-black/60">
      <Animated.View entering={FadeInDown} className="items-center mb-6">
        <Image
          source={user?.avatar?.url ? { uri: user.avatar.url } : require('../assets/avatar-default.png')}
          className="w-32 h-32 rounded-full mb-4 border-2 border-white/30"
        />
        <Text className="text-light text-2xl font-bold">{user.name}</Text>
        <Text className="text-gray-400">{user.email}</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(100)} className="w-full mt-4">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-accent py-4 rounded-2xl active:opacity-90"
        >
          <Text className="text-center text-white font-bold text-lg">Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
