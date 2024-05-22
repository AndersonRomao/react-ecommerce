require('dotenv').config()
require('express-async-errors')
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDB = require('./utils/config');
const seedRouter = require('./controllers/seed');
const loginRouter = require('./controllers/login');
const orderRouter = require('./controllers/order');
const productsRouter = require('./controllers/product');
const usersRouter = require('./controllers/users');
const uploadProductRouter = require('./controllers/uploadProduct');
const uploadCategoryRouter = require('./controllers/uploadCategory')

app.use(cors());
app.use(express.json());
app.use(express.static('images'));
app.use('/api/seed', seedRouter);
app.use('/api/login', loginRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/upload/product', uploadProductRouter)
app.use('/api/upload/category', uploadCategoryRouter)
app.use((err, req, res, next) => {
  res.status(500).send({message: err.message})
})

connectToDB();

module.exports = app;