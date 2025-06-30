import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useAuth } from './authContext';
import axios from 'axios';
import { API_BASE_URL } from '@/constants';

export type Chat = {
  _id: string;
  name: string;
  isGroupChat: boolean;
  users: any[];
  groupAdmin?: any;
  latestMessage?: any;
  updatedAt: string;
};

type ChatContextType = {
  chats: Chat[];
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
  fetchChats: () => Promise<void>;
  loadingChats: boolean;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [loadingChats, setLoadingChats] = useState(false);

  const fetchChats = async () => {
    if (!user) return;
    setLoadingChats(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/chat`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setChats(data);
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    } finally {
      setLoadingChats(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  return (
    <ChatContext.Provider
      value={{ chats, selectedChat, setSelectedChat, fetchChats, loadingChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
