import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  permissions: { type: [String], required: true },
  lastLogin: { type: Date },
  registeredDate: { type: Date, default: Date.now },
  registeredBy: { type: String, required: true },
});

adminSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

export default mongoose.model("Admin", adminSchema);
