import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-black/70 px-6">
      <Animated.Text
        entering={FadeInDown}
        className="text-light text-6xl font-extrabold mb-2"
      >
        404
      </Animated.Text>

      <Animated.Text
        entering={FadeInDown.delay(100)}
        className="text-light text-xl mb-6 text-center"
      >
        Page Not Found
      </Animated.Text>

      <TouchableOpacity
        onPress={() => router.replace('/')}
        className="flex-row items-center bg-accent px-5 py-3 rounded-xl active:opacity-80"
      >
        <ArrowLeft color="white" size={20} />
        <Text className="text-white text-lg ml-2 font-medium">Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
