import { Chat } from '../models/Chat.js';
import { User } from '../models/User.js';
import { Message } from '../models/Message.js';

export const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.sendStatus(400);

  let chat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [req.user._id, userId] },
  })
    .populate('users', '-password')
    .populate('latestMessage');

  chat = await User.populate(chat, {
    path: 'latestMessage.sender',
    select: 'name email avatar',
  });

  if (chat) return res.status(200).json(chat);

  const newChat = await Chat.create({
    chatName: 'sender',
    isGroupChat: false,
    users: [req.user._id, userId],
  });

  const fullChat = await Chat.findById(newChat._id).populate('users', '-password');
  res.status(200).json(fullChat);
};

export const fetchChats = async (req, res) => {
  const chats = await Chat.find({ users: { $in: [req.user._id] } })
    .populate('users', '-password')
    .populate('groupAdmin', '-password')
    .populate('latestMessage')
    .sort({ updatedAt: -1 });

  const populatedChats = await User.populate(chats, {
    path: 'latestMessage.sender',
    select: 'name email avatar',
  });

  res.status(200).json(populatedChats);
};

export const createGroupChat = async (req, res) => {
  const { name, users } = req.body;

  if (!users || !name) return res.status(400).json({ message: 'Missing fields' });

  const parsedUsers = JSON.parse(users);
  if (parsedUsers.length < 2)
    return res.status(400).json({ message: 'At least 2 users required' });

  parsedUsers.push(req.user);

  const groupChat = await Chat.create({
    chatName: name,
    users: parsedUsers,
    isGroupChat: true,
    groupAdmin: req.user,
  });

  const fullGroupChat = await Chat.findById(groupChat._id)
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

  res.status(200).json(fullGroupChat);
};

export const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

  if (!updatedChat) return res.status(404).json({ message: 'Chat not found' });

  res.json(updatedChat);
};

export const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $addToSet: { users: userId } },
    { new: true }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

  res.json(updatedChat);
};

export const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password');

  res.json(updatedChat);
};
