import express from 'express';
import {changePassword} from '../controllers/accountSettings.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/changePassword',authenticate,changePassword);


export default router;