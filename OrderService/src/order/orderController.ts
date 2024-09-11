import { Request, Response } from 'express';
import { OrderService } from "./orderService";



export class OrderController {
    private orderService: OrderService;
  
    constructor(orderService: OrderService) {
      this.orderService = orderService;
    }
  
    async createOrder(req: Request, res: Response) {
      try {
        const order = await this.orderService.create(req.body);
        res.status(201).json(order);
      } catch (error:any) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async getOrders(req: Request, res: Response) {
      try {
        const orders = await this.orderService.getAll();
        res.json(orders);
      } catch (error:any) {
        res.status(400).json({ error: error.message });
      }
    }
  }