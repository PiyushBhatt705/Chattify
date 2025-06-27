import { io, Socket } from "socket.io-client";

const SERVER_URL = "https://chattifybackend.onrender.com"; // ⬅️ Change to your backend IP

let socket: Socket;

export const connectSocket = (userId: string) => {
  socket = io(SERVER_URL, {
    transports: ['websocket'],
    forceNew: true,
  });

  socket.on("connect", () => {
    console.log("✅ Connected to socket:", socket.id);
    socket.emit("join", userId); // Join personal room
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected from socket");
  });
};

export const getSocket = () => {
  if (!socket) throw new Error("Socket not connected");
  return socket;
};
