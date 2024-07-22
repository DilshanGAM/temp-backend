import express from 'express';
import { register, login, logout, getProfile } from '../controllers/authController.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/profile', authenticate, getProfile);

export default router;
