import express from 'express';
import mongoose from 'mongoose';
import { UserController } from './user/userController';
import { authMiddleware } from './middleware/authMiddleware';

const app = express();
app.use(express.json());

const userController = new UserController();

app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/profile', authMiddleware, userController.getProfile);

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/userservice')
  .then(() => console.log('Connected to MongoDB for User Service'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the User Service
app.listen(3001, () => {
  console.log('User Service running on port 3001');
});
