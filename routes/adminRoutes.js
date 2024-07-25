import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/login', loginAdmin);


router.post('/register', authenticate, (req, res, next) => {
    if (!req.admin) {
        return res.status(403).send('Access denied. Only admins can register new admins.');
    }
    next();
}, registerAdmin);

export default router;
