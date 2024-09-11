import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  products: { type: [String], required: true },
  total: { type: Number, required: true },
  userId: { type: String, required: true }
}, { timestamps: true });

export const OrderModel = mongoose.model('Order', orderSchema);
