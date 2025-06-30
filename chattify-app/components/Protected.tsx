import React, { ReactNode, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useTailwind } from "nativewind";

type ProtectedProps = {
  children: ReactNode;
};

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const tailwind = useTailwind();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading]);

  if (loading || !user) {
    return (
      <View style={tailwind("flex-1 justify-center items-center bg-black")}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return <>{children}</>;
};

export default Protected;
