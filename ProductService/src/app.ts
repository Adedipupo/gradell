import express from 'express';
import mongoose from 'mongoose';
import { ProductController } from './product/productController';

const app = express();
app.use(express.json());

const productController = new ProductController();


app.post('/api/products/create', productController.createProduct.bind(productController));
app.get('/api/products/all', productController.getProducts.bind(productController));
app.get('/api/products/:id', productController.getProductById.bind(productController));
app.put('/api/products/:id', productController.updateProduct.bind(productController));
app.delete('api/products/:id', productController.deleteProduct.bind(productController));

// MongoDB connection setup
mongoose.connect('mongodb+srv://dipo:12345@cluster0.ixzicdr.mongodb.net/')
  .then(() => console.log('Connected to MongoDB for Product Service'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the Product Service
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
