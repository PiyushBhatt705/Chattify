import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Protected from '../../components/Protected';

export default function GroupChatScreen() {
  const { groupId } = useLocalSearchParams();

  return (
    <Protected>
      <View className="flex-1 bg-black/70 justify-center items-center px-6">
        <Text className="text-light text-2xl font-bold text-center">
          Group Chat Screen
        </Text>
        <Text className="text-gray-400 mt-2 text-sm">Group ID: {groupId}</Text>
      </View>
    </Protected>
  );
}
