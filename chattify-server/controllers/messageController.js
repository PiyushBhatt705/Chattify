import { Message } from '../models/Message.js';
import {Chat} from '../models/Chat.js';
import { getIO } from '../socket.js';

export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({ message: 'Missing content or chat ID' });
  }

  const newMessage = await Message.create({
    sender: req.user._id,
    content,
    chat: chatId,
  });

  const populatedMsg = await newMessage
    .populate('sender', 'name email')
    .populate('chat')
    .execPopulate();

  const fullMsg = await populatedMsg
    .populate({
      path: 'chat.users',
      select: 'name email',
    })
    .execPopulate();

  await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage });

  // Emit via Socket.IO
  fullMsg.chat.users.forEach((user) => {
    if (user._id.toString() === req.user._id.toString()) return;
    getIO().to(user._id.toString()).emit('newMessage', fullMsg);
  });

  res.status(201).json(fullMsg);
};

export const getMessages = async (req, res) => {
  const messages = await Message.find({ chat: req.params.chatId })
    .populate('sender', 'name email')
    .populate('chat');
  res.json(messages);
};
