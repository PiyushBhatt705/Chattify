import express from 'express';
import {
  sendMessage,
  getMessages,
} from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/messages - Send a message
router.post('/', protect, sendMessage);

// GET /api/messages/:chatId - Get all messages for a chat
router.get('/:chatId', protect, getMessages);



export default router;
