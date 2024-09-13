import axios from 'axios';
import { Payment } from './paymentModel';

export class PaymentService {
  async initiate(orderId: string, amount: number, email: string) {
    try {
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email: email,
          amount: amount * 100,
        },
        {
          headers: {
            Authorization: `Bearer sk_test_a397a658d9a4a6541b4bea1ee82d06fe67b665fc`,
            'Content-Type': 'application/json',
          },
        }
      );

      const payment = new Payment({
        orderId: orderId,
        email: email,
        amount: amount,
        status: 'pending',
        reference: response.data.data.reference,
      });

      await payment.save();

      return {
        authorization_url: response.data.data.authorization_url,
        reference: response.data.data.reference,
        amount: response.data.data.amount,
      };
    } catch (error: any) {
      console.error('Error initiating Paystack transaction:', error.message);
      throw error;
    }
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
