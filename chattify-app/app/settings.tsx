import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Save to AsyncStorage or context if needed
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    // Save to AsyncStorage or context if needed
  };

  return (
    <View className="flex-1 bg-black/60 px-6 pt-12">
      <Animated.Text
        entering={FadeInDown}
        className="text-light text-3xl font-bold mb-8"
      >
        Settings
      </Animated.Text>

      <Animated.View entering={FadeInDown.delay(100)} className="mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-light text-lg">Dark Mode</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-light text-lg">Notifications</Text>
          <Switch value={notifications} onValueChange={toggleNotifications} />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200)}>
        <TouchableOpacity
          onPress={() => router.push('/profile')}
          className="bg-white/10 py-4 rounded-2xl active:opacity-80"
        >
          <Text className="text-center text-light font-semibold text-lg">View Profile</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
