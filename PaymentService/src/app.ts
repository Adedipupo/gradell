import express from 'express';
import { PaymentController } from './payment/paymentController';

const app = express();
app.use(express.json());

const paymentController = new PaymentController();

app.post('/payments', paymentController.createPayment);
app.post('/payments/webhook', paymentController.handleWebhook);

app.listen(3004, () => console.log('Payment Service running on port 3004'));

