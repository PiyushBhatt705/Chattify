// app/_not-found.tsx
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      <Text className="text-white text-4xl font-extrabold mb-2">404</Text>
      <Text className="text-gray-400 text-lg mb-6 text-center">
        Oops! The page you're looking for doesn't exist.
      </Text>

      <Pressable
        onPress={() => router.replace('/')}
        className="bg-violet-600 px-6 py-3 rounded-2xl active:opacity-80"
      >
        <Text className="text-white text-lg font-semibold">Go to Home</Text>
      </Pressable>
    </View>
  );
}
