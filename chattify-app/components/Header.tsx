// components/Header.tsx
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ title }: { title: string }) {
  return (
    <View className="bg-black border-b border-gray-800 px-4 py-4">
      <View className="flex-row items-center">
        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#888" className="mr-2" />
        <Text className="text-white text-lg font-semibold">{title}</Text>
      </View>
    </View>
  );
}
