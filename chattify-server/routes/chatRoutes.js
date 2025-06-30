import express from 'express';
import {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, accessChat); // Create/access one-on-one chat
router.get('/', protect, fetchChats); // Get all chats for user
router.post('/group', protect, createGroupChat); // Create group
router.put('/rename', protect, renameGroup); // Rename group
router.put('/groupadd', protect, addToGroup); // Add user to group
router.put('/groupremove', protect, removeFromGroup); // Remove user from group

export default router;
