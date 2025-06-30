import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTailwind } from "nativewind";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type ContactCardProps = {
  userId: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  showIcon?: boolean;
  onPress?: () => void;
};

const ContactCard: React.FC<ContactCardProps> = ({
  userId,
  name,
  email,
  avatarUrl,
  showIcon = true,
  onPress,
}) => {
  const tailwind = useTailwind();
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/chat/${userId}`);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={tailwind(
        "flex-row items-center p-4 border-b border-gray-800 bg-[#0d0d0d] active:bg-[#1a1a1a]"
      )}
    >
      <Image
        source={{
          uri:
            avatarUrl ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(name),
        }}
        style={tailwind("w-12 h-12 rounded-full")}
      />

      <View style={tailwind("flex-1 ml-4")}>
        <Text style={tailwind("text-white text-base font-semibold")}>
          {name}
        </Text>
        {email && (
          <Text style={tailwind("text-gray-400 text-sm")}>{email}</Text>
        )}
      </View>

      {showIcon && (
        <Ionicons name="chatbubble-ellipses" size={20} color="#888" />
      )}
    </TouchableOpacity>
  );
};

export default ContactCard;
