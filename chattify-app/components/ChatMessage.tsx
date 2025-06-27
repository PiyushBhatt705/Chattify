import { View, Text } from "react-native";
import { Message } from "@/types";

type Props = {
  message: Message;
  isOwn: boolean;
};

export default function ChatMessage({ message, isOwn }: Props) {
  return (
    <View
      className={`px-4 py-2 my-1 rounded-2xl max-w-[75%] ${
        isOwn ? "bg-green-600 self-end" : "bg-gray-700 self-start"
      }`}
    >
      <Text className="text-white text-base">{message.content}</Text>
    </View>
  );
}
