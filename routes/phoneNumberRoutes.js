import express from "express";
import {
  createPhoneNumber,
  getPhoneNumbers,
  getPhoneNumberById,
  updatePhoneNumber,
  deletePhoneNumber,
} from "../controllers/phoneNumberController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/", authenticate, createPhoneNumber);
router.get("/", authenticate, getPhoneNumbers);
router.get("/:id", authenticate, getPhoneNumberById);
router.put("/:id", authenticate, updatePhoneNumber);
router.delete("/:id", authenticate, deletePhoneNumber);

export default router;
