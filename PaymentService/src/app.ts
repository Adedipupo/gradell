import express from 'express';
import mongoose from 'mongoose';
import { PaymentController } from './payment/paymentController';

const app = express();
app.use(express.json());

const paymentController = new PaymentController();

app.post('/api/payments/create', paymentController.createPayment.bind(paymentController));
app.post('/payments/webhook', paymentController.handleWebhook.bind(paymentController));

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/paymentservice')
  .then(() => console.log('Connected to MongoDB for Payment Service'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the Payment Service
app.listen(3004, () => console.log('Payment Service running on port 3004'));
