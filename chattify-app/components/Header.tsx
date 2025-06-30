import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTailwind } from "nativewind";

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = true,
  rightIcon,
  onRightPress,
}) => {
  const router = useRouter();
  const tailwind = useTailwind();

  return (
    <View
      style={tailwind(
        "flex-row items-center justify-between px-4 py-3 bg-[#0d0d0d] border-b border-gray-800"
      )}
    >
      <View style={tailwind("flex-row items-center")}>
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <Text
          style={tailwind(
            `text-white text-lg font-semibold ml-${showBackButton ? "3" : "0"}`
          )}
        >
          {title}
        </Text>
      </View>

      {rightIcon && (
        <TouchableOpacity onPress={onRightPress}>
          <Ionicons name={rightIcon} size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
