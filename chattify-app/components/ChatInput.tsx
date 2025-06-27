import { View, TextInput, TouchableOpacity, Keyboard } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onSend: (message: string) => void;
};

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
      Keyboard.dismiss();
    }
  };

  return (
    <View className="flex-row items-center bg-gray-900 px-4 py-3 border-t border-gray-700">
      <TextInput
        className="flex-1 text-white bg-gray-800 rounded-full px-4 py-2 mr-2"
        placeholder="Type a message..."
        placeholderTextColor="#aaa"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSend}
        returnKeyType="send"
      />
      <TouchableOpacity onPress={handleSend}>
        <Ionicons name="send" size={24} color="#4ade80" />
      </TouchableOpacity>
    </View>
  );
}
