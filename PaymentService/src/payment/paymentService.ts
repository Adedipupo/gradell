import axios from 'axios';
import { Payment } from './paymentModel'; // Assuming the payment model is in paymentModel.ts

export class PaymentService {
  async initiate(data: { orderId: string; amount: number; email: string }) {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: data.email,
        amount: data.amount * 100,
      },
      {
        headers: {
          Authorization: `Bearer sk_test_a397a658d9a4a6541b4bea1ee82d06fe67b665fc`,
        },
      }
    );

    const payment = new Payment({
      orderId: data.orderId,
      amount: data.amount,
      status: 'pending',
      reference: response.data.data.reference,
    });

    return await payment.save();
  }

  async verifyWebhook(event: any) {
    if (event.event === 'charge.success') {
      const { reference, status } = event.data;
      const payment = await Payment.findOneAndUpdate(
        { reference },
        { status },
        { new: true }
      );
      if (!payment) throw new Error('Payment not found');
    }
  }
}
