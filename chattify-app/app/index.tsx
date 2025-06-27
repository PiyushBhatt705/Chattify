import Protected from '../components/Protected';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Protected>
      <View className="flex-1 bg-black justify-center items-center px-6">
        <Text className="text-white text-3xl font-bold mb-6">Welcome to ✨ Chattify</Text>

        <Pressable
          onPress={() => router.push('/users')}
          className="bg-violet-600 px-6 py-3 rounded-2xl mb-4 active:opacity-80"
        >
          <Text className="text-white font-semibold text-lg">Find People</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/settings')}
          className="bg-gray-800 px-6 py-3 rounded-2xl active:opacity-80"
        >
          <Text className="text-white font-medium text-lg">Settings</Text>
        </Pressable>
      </View>
    </Protected>
  );
}
