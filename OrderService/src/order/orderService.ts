import { Producer } from "kafka-node";
import { OrderModel } from "./orderModel";



export class OrderService {
    private producer: Producer;
  
    constructor(producer: Producer) {
      this.producer = producer;
    }
  
    async create(data: { products: string[]; total: number; userId: string }) {
      const order = new OrderModel(data);
      await order.save();
  
      // Publish an event to Kafka after the order is created
      const payloads = [
        { topic: 'order_created', messages: JSON.stringify(order), partition: 0 }
      ];
  
      this.producer.send(payloads, (err, data) => {
        if (err) {
          console.error('Error sending message to Kafka:', err);
        } else {
          console.log('Order creation message sent to Kafka:', data);
        }
      });
  
      return order;
    }
  
    async getAll() {
      return await OrderModel.find();
    }
  }