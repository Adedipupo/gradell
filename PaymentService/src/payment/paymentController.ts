import { Request, Response } from 'express';
import { PaymentService } from './paymentService';

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async createPayment(req: Request, res: Response) {
    try {
      const { orderId, amount, email } = req.body;
      const paymentResponse = await this.paymentService.initiate(orderId, amount, email);
      res.json(paymentResponse);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async handleWebhook(req: Request, res: Response) {
    try {
      await this.paymentService.verifyWebhook(req.body);
      res.status(200).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
