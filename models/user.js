import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String },
    birthYear: { type: Number },
    passwordHash: { type: String, required: true },
    profilePicture: { type: String },
    lastLogin: { type: Date },
    registeredDate: { type: Date, default: Date.now }
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

export default mongoose.model('User', userSchema);
