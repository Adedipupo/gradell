import express from 'express';
import mongoose from 'mongoose';
import { UserController } from './user/userController';
import { authMiddleware } from './middleware/authMiddleware';

const app = express();
app.use(express.json());

const userController = new UserController();

app.post('/api/users/register', userController.register.bind(userController));  // bind the context
app.post('/api/users/login', userController.login.bind(userController));
app.get('/profile', authMiddleware, userController.getProfile);

// MongoDB connection setup
mongoose.connect('mongodb+srv://dipo:12345@cluster0.vafzi.mongodb.net/')
  .then(() => console.log('Connected to MongoDB for User Service'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the User Service
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
