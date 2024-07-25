import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from '../models/admin.js';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const registerAdmin = async (req, res) => {
    try {
        const { email, password, name, permissions,registeredBy } = req.body;

        
        if (!req.admin) {
            return res.status(403).send('Only admins can register other admins.');
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const newAdmin = new Admin({
            email,
            passwordHash,
            name,
            permissions,
            registeredBy: req.admin.email
        });

        await newAdmin.save();
        res.status(201).send('Admin registered successfully');
    } catch (error) {
        res.status(400).send('Error registering admin: ' + error.message);
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin || !admin.comparePassword(password)) {
            return res.status(401).send('Invalid email or password');
        }

        const token = jwt.sign({ id: admin._id, type: 'admin' }, secretKey, { expiresIn: '1h' });
        admin.lastLogin = new Date();
        await admin.save();

        res.status(200).json({ token });
    } catch (error) {
        res.status(400).send('Error logging in: ' + error.message);
    }
};



