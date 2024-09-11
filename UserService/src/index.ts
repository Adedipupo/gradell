import express from 'express';
import { db } from './config/db';
import { UserController } from './user/userController';
import { authMiddleware } from './middleware/authMiddleware';


const app = express();
app.use(express.json());

const userController = new UserController();

app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/profile', authMiddleware, userController.getProfile);

// Start the User Service
app.listen(3001, () => {
    console.log('User Service running on port 3001');
  });
  
  // PostgreSQL connection setup
  db.connect()
    .then(() => console.log('Connected to PostgreSQL for User Service'))
    .catch(err => console.error('PostgreSQL connection error:', err));