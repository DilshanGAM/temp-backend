import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/", authenticate, createOrder); // POST /orders
router.get("/", authenticate, getOrders); // GET /orders
router.get("/:id", authenticate, getOrderById); // GET /orders/:id
router.put("/:id", authenticate, updateOrder); // PUT /orders/:id
router.delete("/:id", authenticate, deleteOrder); // DELETE /orders/:id

export default router;
