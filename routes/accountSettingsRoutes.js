import express from 'express';
import {changePassword , changeAccountSettings } from '../controllers/accountSettings.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/changePassword',authenticate,changePassword);
router.post('/changeAccountSettings', authenticate, changeAccountSettings);


export default router;