import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  orderedDate: { type: Date, required: true },
  shippedDate: { type: Date },
  deliveredDate: { type: Date },
  customer: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true }
  },
  items: [
    {
      productName: { type: String, required: true },
      variant: {
        color: { type: String, required: true },
        size: { type: String, required: true },
        storage: { type: String }
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
