// app/settings.tsx
import Protected from '../components/Protected';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import Toast from 'react-native-toast-message';

export default function Settings() {
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    Toast.show({
      type: 'success',
      text1: 'Logged out',
      text2: 'See you soon, ' + (user?.name || 'user') + '!',
    });
    router.replace('/login');
  };

  return (
    <Protected>
      <View className="flex-1 bg-black px-6 pt-20">
        <Text className="text-white text-3xl font-bold mb-6">Settings ⚙️</Text>

        {/* Logout */}
        <Pressable
          onPress={handleLogout}
          className="bg-red-600 w-full rounded-2xl py-3 mt-5 active:opacity-80"
        >
          <Text className="text-white text-center text-lg font-semibold">Logout</Text>
        </Pressable>
      </View>
    <Protected>

  );
}
