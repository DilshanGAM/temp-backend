import Order from '../models/Order.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Read an order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send();
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an order by ID
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) {
      return res.status(404).send();
    }
    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an order by ID
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send();
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};
