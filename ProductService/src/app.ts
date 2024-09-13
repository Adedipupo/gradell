import express from 'express';
import mongoose from 'mongoose';
import { ProductController } from './product/productController';

const app = express();
app.use(express.json());

const productController = new ProductController();

app.post('/products', productController.createProduct);
app.get('/products', productController.getProducts);
app.get('/products/:id', productController.getProductById);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/productService')
  .then(() => console.log('Connected to MongoDB for Product Service'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the Product Service
app.listen(3001, () => {
  console.log('Product Service running on port 3001');
});
