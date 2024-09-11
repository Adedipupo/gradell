import express from 'express';
import { db } from './config/db';
import { ProductController } from './product/prodcutController';


const app = express();
app.use(express.json());


const productController = new ProductController();

app.post('/products', productController.createProduct);
app.get('/products', productController.getProducts);
app.get('/products/:id', productController.getProductById);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

// Start the User Service
app.listen(3001, () => {
    console.log('Product Service running on port 3001');
  });
  
  // PostgreSQL connection setup
  db.connect()
    .then(() => console.log('Connected to PostgreSQL for Postgres Service'))
    .catch(err => console.error('PostgreSQL connection error:', err));