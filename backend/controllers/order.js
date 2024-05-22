const orderRouter = require('express').Router()
const Order = require('../models/orderModel')
const User = require('../models/userModel')

const { tokenExtractor, admin } = require('../utils/middleware')

orderRouter.get('/', tokenExtractor, admin, async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name');
  res.json(orders);
});

orderRouter.get('/:id', tokenExtractor, async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', ['name', 'email'])
  if (order) {
    res.json(order)
  } else {
    res.status(404).send({ message: 'Order not found!'})
    }
});

orderRouter.post('/', tokenExtractor,  async (req, res) => {
  try {
    const { 
    orderItems, 
    shippingAddress, 
    itemsPrice, 
    shippingPrice,
    totalPrice,
  } = req.body
    
    const user = await User.findById(req.user._id)

    const newOrder = new Order({
    orderItems: orderItems,
    shippingAddress: shippingAddress,
    itemsPrice: itemsPrice,
    shippingPrice: shippingPrice,
    totalPrice: totalPrice,
    user: req.user._id,
    })

    const order = await newOrder.save()
    user.orders = user.orders.concat(order._id)
    await user.save()
  res.status(201).send({ message: 'Order created', order })
  } catch(error) {
    res.status(400).send({ message: 'Invalid data!'})
  }
  });

orderRouter.delete('/:id', tokenExtractor, async (req, res) => {
  const order = await Order.findById(req.params.id)
   if (order) {
      await order.remove()
      res.send({ message: 'Order deleted!' })
    } else {
      res.status(400).send({ message: 'Order not found!'})
    }
});

module.exports = orderRouter