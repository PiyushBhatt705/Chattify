/*
📁 app/chat/[chatId].tsx
*/
import { View, Text, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getSocket } from '@/lib/socket';
import ChatInput from '@/components/ChatInput';
import { Message } from '@/types';
import axios from 'axios';
import ChatMessage from '@/components/ChatMessage';

export default function ChatScreen() {
  const { chatId } = useLocalSearchParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://<YOUR-IP>:5000/api/messages/${chatId}`);
        setMessages(res.data.messages);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  useEffect(() => {
    const socket = getSocket();
    socket.on('receiveMessage', ({ senderId, message }) => {
      if (senderId && message && chatId) {
        setMessages((prev) => [...prev, { senderId, content: message }]);
        scrollToBottom();
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [chatId]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMsg: Message = {
      senderId: user!._id,
      content: text,
    };

    const socket = getSocket();
    socket.emit('sendMessage', {
      senderId: user!._id,
      receiverId: chatId,
      message: text,
    });

    setMessages((prev) => [...prev, newMsg]);
    scrollToBottom();

    try {
      await axios.post(`http://<YOUR-IP>:5000/api/messages/send`, {
        chatId,
        senderId: user!._id,
        content: text,
      });
    } catch (err) {
      console.error('Message not saved:', err);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-black"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ChatMessage message={item} isOwn={item.senderId === user?._id} />
        )}
        contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 10 }}
      />

      <ChatInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}
