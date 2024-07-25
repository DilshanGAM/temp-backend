import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';
import User from '../models/user.js';

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        req.user = decoded;

        if (req.user.type === 'admin') {
            req.admin = await Admin.findById(req.user.id);
            if (!req.admin) {
                return res.status(401).send('Invalid admin token.');
            }
        } else {
            req.user = await User.findById(req.user.id);
            if (!req.user) {
                return res.status(401).send('Invalid user token.');
            }
        }

        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};

export default authenticate;
