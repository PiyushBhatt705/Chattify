// App.tsx
import { Slot } from 'expo-router';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Slot />
        <Toast />
      </ChatProvider>
    </AuthProvider>
  );
}


