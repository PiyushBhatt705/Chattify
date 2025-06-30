/*
📁 app/_layout.tsx
*/
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ImageBackground } from 'react-native';
import Toast from 'react-native-toast-message';
import '../styles/index.css';

export default function Layout() {
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      resizeMode="cover"
      className="flex-1"
    >
      <SafeAreaView className="flex-1 bg-black/60">
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </SafeAreaView>
    </ImageBackground>
  );
}
