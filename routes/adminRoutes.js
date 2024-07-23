import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();


router.post('/login', loginAdmin);


router.post('/register', authenticate, registerAdmin);

export default router;
