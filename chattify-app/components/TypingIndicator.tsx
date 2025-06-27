// components/TypingIndicator.tsx
import { View, Text } from 'react-native';

export default function TypingIndicator() {
  return (
    <View className="ml-3 mt-1 mb-2">
      <Text className="text-gray-400 italic">Someone is typing...</Text>
    </View>
  );
}
