import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { KafkaClient, Producer } from 'kafka-node';
import { OrderService } from './order/orderService';
import { OrderController } from './order/orderController';

const app = express();
app.use(bodyParser.json());

// Kafka setup for producer
const kafkaClient = new KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(kafkaClient);

producer.on('ready', () => {
  console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (err) => {
  console.error('Error with Kafka Producer:', err);
});

// MongoDB connection setup
mongoose.connect('mongodb+srv://dipo:12345@cluster0.ns5b8.mongodb.net/')
  .then(() => console.log('Connected to MongoDB for Order Service'))
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize OrderController with Kafka producer
const orderService = new OrderService(producer);
const orderController = new OrderController(orderService);

// // Order routes
app.post('/api/orders/create', orderController.createOrder.bind(orderController));
app.get('/api/orders/all', orderController.getOrders.bind(orderController));

// Start the Order Service
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
