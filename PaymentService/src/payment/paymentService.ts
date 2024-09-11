import { db } from '../config/db';
import axios from 'axios';

export class PaymentService {
  async initiate(data: { orderId: string; amount: number; email: string }) {
    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      email: data.email,
      amount: data.amount * 100,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const payment = await db.query(
      'INSERT INTO payments (order_id, amount, status, reference) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.orderId, data.amount, 'pending', response.data.data.reference]
    );

    return payment.rows[0];
  }

  async verifyWebhook(event: any) {
    if (event.event === 'charge.success') {
      const { reference, status } = event.data;
      await db.query(
        'UPDATE payments SET status = $1 WHERE reference = $2',
        [status, reference]
      );
    }
  }
}
