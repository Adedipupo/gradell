import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
});

export const Payment = mongoose.model('Payment', paymentSchema);
