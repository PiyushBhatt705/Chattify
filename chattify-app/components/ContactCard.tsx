// components/ContactCard.tsx
import { View, Text, Pressable, Image } from 'react-native';

export default function ContactCard({
  name,
  onPress,
}: {
  name: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center bg-gray-900 px-4 py-3 rounded-xl mb-3 active:opacity-90"
    >
      <Image
        source={{ uri: `https://api.dicebear.com/7.x/initials/svg?seed=${name}` }}
        className="w-10 h-10 rounded-full mr-4"
      />
      <Text className="text-white text-base">{name}</Text>
    </Pressable>
  );
}
