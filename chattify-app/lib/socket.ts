import { io, Socket } from 'socket.io-client';
import { User } from '@/context/authContext';

let socket: Socket | null = null;

export const initSocket = (user: User) => {
  socket = io('http://localhost:5000', {
    auth: {
      token: user.token,
    },
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('🔌 Socket connected:', socket?.id);
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected');
  });
};

export const getSocket = (): Socket | null => {
  return socket;
};
