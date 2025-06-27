// types/index.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
}

export interface Message {
  _id: string;
  sender: User;
  content: string;
  chat: string | Chat;
  createdAt: string;
  updatedAt: string;
  seenBy?: User[];
  senderId: string;
}

export interface Chat {
  _id: string;
  participants: User[];
  messages?: Message[];
  isGroup: false;
  createdAt?: string;
  updatedAt?: string;
}

export interface GroupChat extends Chat {
  isGroup: true;
  groupName: string;
  admin: User;
}

export type TypingEvent = {
  userId: string;
  chatId: string;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export type ChatContextType = {
  activeChatId: string | null;
  messages: Message[];
  selectChat: (id: string) => void;
  addMessage: (msg: Message) => void;
  setMessages: (msgs: Message[]) => void;
};
