// 📁 app/index.tsx
import Protected from '../components/Protected';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  return (
    <Protected>
      <View className="flex-1 bg-black/70 justify-center items-center px-6">
        <Text className="text-light text-3xl font-bold mb-8 text-center">
          Welcome to ✨ Chattify
        </Text>

        <Pressable
          onPress={() => router.push('/users')}
          className="bg-accent px-6 py-3 rounded-2xl mb-4 active:opacity-80"
        >
          <Text className="text-white font-semibold text-lg">Find People</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/settings')}
          className="bg-white/10 px-6 py-3 rounded-2xl active:opacity-80"
        >
          <Text className="text-light font-medium text-lg">Settings</Text>
        </Pressable>
      </View>
    </Protected>
  );
}
