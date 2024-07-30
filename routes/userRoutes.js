import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
} from "../controllers/userController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);
router.get("/profile", authenticate, getProfile);

export default router;
