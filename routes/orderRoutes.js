import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder); // POST /orders
router.get('/', getOrders); // GET /orders
router.get('/:id', getOrderById); // GET /orders/:id
router.put('/:id', updateOrder); // PUT /orders/:id
router.delete('/:id', deleteOrder); // DELETE /orders/:id

export default router;
