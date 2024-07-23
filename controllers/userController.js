import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const secretKey = process.env.JWT_SECRET || 'your_secret_key'; 

export const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, gender, birthYear, profilePicture } = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);

        const user = new User({
            email,
            passwordHash, 
            firstName,
            lastName,
            gender,
            birthYear,
            profilePicture,
            registeredDate: new Date()
        });

        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user: ' + error.message);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !user.comparePassword(password)) {
            return res.status(401).send('Invalid email or password');
        }

        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({ token });
    } catch (error) {
        res.status(400).send('Error logging in: ' + error.message);
    }
};

export const logout = (req, res) => {
    res.status(200).send('User logged out successfully');
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-passwordHash'); 
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send('Error fetching profile: ' + error.message);
    }
};
