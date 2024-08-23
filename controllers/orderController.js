import Order from "../models/Order.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      customerId: req.user ? req.user._id : null,  
      monitoredBy: req.admin ? req.admin._id : null, 
    });
    await order.save();
    res.status(201).json(order); 
  } catch (error) {
    res.status(400).json({ message: "Failed to create order", error: error.message });
  }
};

// Read all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Consider using .populate() if you need to reference user/admin details
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

// Read an order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error: error.message });
  }
};

// Update an order by ID
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    Object.assign(order, req.body);
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Failed to update order", error: error.message });
  }
};

// Delete an order by ID
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.remove();
    res.json({ message: "Order deleted successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
};
