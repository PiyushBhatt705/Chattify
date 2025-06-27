// app/profile.tsx
import Protected from '../components/Protected';
import { View, Text, Image } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();

  return (
    <Protected>
      <View className="flex-1 items-center justify-center bg-black px-6">
        <Image
          source={{ uri: user?.avatar || 'https://i.pravatar.cc/150?img=5' }}
          className="w-32 h-32 rounded-full mb-6 border-4 border-violet-500"
        />
        <Text className="text-white text-2xl font-bold">{user?.name}</Text>
        <Text className="text-gray-400 mt-1">{user?.email}</Text>
      </View>
    <Protected>

  );
}
