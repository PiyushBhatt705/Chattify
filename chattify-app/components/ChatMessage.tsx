import React from "react";
import { View, Text, Image } from "react-native";
import { useTailwind } from "nativewind";
import { useAuth } from "@/context/AuthContext";

type Message = {
  _id: string;
  sender: {
    _id: string;
    name: string;
    avatar?: {
      url: string;
    };
  };
  content: string;
  createdAt: string;
  media?: string; // optional image/file
};

type ChatMessageProps = {
  message: Message;
  isSameSenderAsPrevious?: boolean;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isSameSenderAsPrevious }) => {
  const { user } = useAuth();
  const tailwind = useTailwind();

  const isOwnMessage = message.sender._id === user._id;

  return (
    <View
      style={tailwind(
        `px-3 ${isOwnMessage ? "items-end" : "items-start"}`
      )}
    >
      <View
        style={tailwind(
          `max-w-[80%] mt-2 px-4 py-2 rounded-2xl ${
            isOwnMessage
              ? "bg-blue-600 rounded-tr-none"
              : "bg-gray-800 rounded-tl-none"
          }`
        )}
      >
        {/* If message has media */}
        {message.media && (
          <Image
            source={{ uri: message.media }}
            style={tailwind("w-48 h-48 mb-2 rounded-xl")}
            resizeMode="cover"
          />
        )}

        <Text style={tailwind("text-white text-base")}>{message.content}</Text>

        <Text
          style={tailwind(
            "text-xs text-gray-400 mt-1 self-end"
          )}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>

      {/* Show sender avatar only if not own message and first in a group */}
      {!isOwnMessage && !isSameSenderAsPrevious && message.sender.avatar?.url && (
        <Image
          source={{ uri: message.sender.avatar.url }}
          style={tailwind("w-6 h-6 rounded-full mt-1")}
        />
      )}
    </View>
  );
};

export default ChatMessage;
