import bcrypt from "bcrypt";
import User from "../models/user.js";

// Change password
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Please provide old password and new password" });
  }

  try {
    const user = req.user;

    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Change account settings
export const changeAccountSettings = async (req, res) => {
  const { firstName, lastName, password, gender, birthYear, profilePicture } = req.body;

  try {
    const user = req.user;

    // Update user fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (gender) user.gender = gender;
    if (birthYear) user.birthYear = birthYear;
    if (profilePicture) user.profilePicture = profilePicture;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(password, salt);
    }

    await user.save();

    res
      .status(200)
      .json({ message: "Account settings updated successfully", user });
  } catch (error) {
      console.error("Error updating account settings:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};
