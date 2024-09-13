import express from 'express';
import axios from 'axios';
import logger from 'morgan'
import morgan from 'morgan'
import helmet from 'helmet'
const app = express();


app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan('combined', { stream: accessLogStream }))

// Route to User Service
app.all('/api/users/*', (req, res) => {
  const url = `http://localhost:4000${req.originalUrl}`;
  axios({ method: req.method, url, data: req.body })
    .then(response => res.send(response.data))
    .catch(err => res.status(err.response.status).send(err.response.data));
});

// Route to Order Service
app.all('/api/orders/*', (req, res) => {
  const url = `http://localhost:5000${req.originalUrl}`;
  axios({ method: req.method, url, data: req.body })
    .then(response => res.send(response.data))
    .catch(err => res.status(err.response.status).send(err.response.data));
});

// Route to Payment Service
app.all('/api/payments/*', (req, res) => {
  const url = `http://localhost:6000${req.originalUrl}`;
  axios({ method: req.method, url, data: req.body })
    .then(response => res.send(response.data))
    .catch(err => res.status(err.response.status).send(err.response.data));
});

// Route to Product Service
app.all('/api/products/*', (req, res) => {
  const url = `http://localhost:7000${req.originalUrl}`;
  axios({ method: req.method, url, data: req.body })
    .then(response => res.send(response.data))
    .catch(err => res.status(err.response.status).send(err.response.data));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});