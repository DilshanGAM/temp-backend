import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, default: () => new mongoose.Types.ObjectId().toString() },
  customerId :{type : String},
  status: { type: String, required: true },
  monitoredBy:{ type : String},
  orderedDate: { type: Date, required: true },
  shippedDate: { type: Date },
  deliveredDate: { type: Date },
  cancelledDate : {type:Date},
  notes : {type : String},
  customer: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
  },
  items:[{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    altNames: [{ type: String }],
    labeledPrice: { type: Number, required: true },
    lastPrice: { type: Number, required: true },
    description: { type: String },
    image: [{ type: String }],
    offerEnding: { type: Date },
    variedBy: [
      {
        name: { type: String },
        values: [
          {
            name: { type: String },
            icon: { type: String },
            _id: false
          }
        ],
        iconType: { type: String },
        _id: false
      }
    ],
    variant: {
      filters: [{ type: String }],
      images: [{ type: String }],
      labeledPrice: { type: Number },
      lastPrice: { type: Number },
      stock: { type: Number },
    },
    quantity: { type: Number, required: true },
  }],
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
