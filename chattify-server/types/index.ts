// User type
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  token?: string;
}

// Message type
export interface IMessage {
  _id: string;
  sender: IUser;
  content: string;
  chat: IChat;
  seenBy: IUser[];
  createdAt: string;
  updatedAt: string;
}

// Chat type
export interface IChat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: IUser[];
  latestMessage?: IMessage;
  groupAdmin?: IUser;
  createdAt: string;
  updatedAt: string;
}
