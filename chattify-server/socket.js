import { Server } from 'socket.io';

let io;
let users = [];

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('⚡️ New socket connection:', socket.id);

    // Join user with their ID
    socket.on('setup', (userData) => {
      socket.join(userData._id);
      users.push({ userId: userData._id, socketId: socket.id });
      socket.emit('connected');
    });

    // Join a specific chat room
    socket.on('join chat', (room) => {
      socket.join(room);
    });

    // Typing indicators
    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    // New message broadcast
    socket.on('new message', (message) => {
      const chat = message.chat;
      if (!chat?.users) return;

      chat.users.forEach((user) => {
        if (user._id === message.sender._id) return;
        socket.in(user._id).emit('message received', message);
      });
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      users = users.filter((u) => u.socketId !== socket.id);
      console.log('🔌 Disconnected socket:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
