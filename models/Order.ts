import mongoose, { Schema, models } from "mongoose";

const OrderItemSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: String,
  price: Number,
  image: String,
  quantity: Number,
});

const CustomerSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  address: String,
  pincode: String,
  paymentMethod: String,
});

const OrderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    date: String,

    customer: CustomerSchema,

    items: [OrderItemSchema],

    total: Number,

    status: {
      type: String,
      default: "Pending Confirmation",
    },
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || mongoose.model("Order", OrderSchema);

export default Order;