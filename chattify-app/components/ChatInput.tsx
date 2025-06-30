import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Keyboard, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTailwind } from "nativewind";

type ChatInputProps = {
  onSend: (message: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const tailwind = useTailwind();

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
      Keyboard.dismiss();
    }
  };

  return (
    <View
      style={tailwind(
        "flex-row items-center p-3 bg-[#0d0d0d] border-t border-gray-800"
      )}
    >
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        placeholderTextColor="#888"
        style={tailwind(
          "flex-1 text-white px-4 py-2 rounded-full bg-[#1a1a1a] border border-gray-700"
        )}
        multiline
      />
      <TouchableOpacity
        onPress={handleSend}
        style={tailwind(
          "ml-3 p-2 rounded-full bg-[#2563eb] active:bg-[#1e40af]"
        )}
      >
        <Ionicons name="send" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
