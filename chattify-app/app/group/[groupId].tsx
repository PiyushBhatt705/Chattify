// app/group/[groupId].tsx
import Protected from '../components/Protected';
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import ChatInput from '../../components/ChatInput';
import ChatMessage from '../../components/ChatMessage';
import TypingIndicator from '../../components/TypingIndicator';

export default function GroupChatScreen() {
  const { groupId } = useLocalSearchParams();

  return (
    <Protected>
      <View className="flex-1 bg-black pt-14">
        <View className="flex-1 px-4">
          <ChatMessage message="Welcome to the group chat." sender="system" />
          <TypingIndicator />
        </View>

        <ChatInput groupId={groupId as string} />
      </View>
    <Protected>

  );
}
