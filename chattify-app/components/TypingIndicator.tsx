import React from "react";
import { View, Text } from "react-native";
import { useTailwind } from "nativewind";
import { MotiView } from "moti";

const TypingIndicator = () => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("px-4 py-2")}>
      <View
        style={tailwind(
          "flex-row items-center self-start bg-gray-800 rounded-2xl px-4 py-2"
        )}
      >
        <Text style={tailwind("text-white mr-2 text-sm")}>Typing</Text>

        <View style={tailwind("flex-row space-x-1")}>
          {[0, 1, 2].map((i) => (
            <MotiView
              key={i}
              from={{ opacity: 0.3, translateY: 0 }}
              animate={{ opacity: 1, translateY: -3 }}
              transition={{
                loop: true,
                delay: i * 150,
                type: "timing",
                duration: 600,
              }}
              style={tailwind("w-2 h-2 bg-white rounded-full")}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default TypingIndicator;
