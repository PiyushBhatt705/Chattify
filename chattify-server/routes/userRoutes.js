import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { searchUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/', protect, searchUsers); // /api/users?search=example

export default router;
