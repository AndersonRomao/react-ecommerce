const seedRouter = require('express').Router()
const products = require('../data/products.js')
const users = require('../data/users')
const Product = require('../models/productModel')
const User = require('../models/userModel')

seedRouter.get('/', async (req, res) => {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(products);
    await User.deleteMany({});
    const createdUsers = await User.insertMany(users);
    res.send({ createdProducts, createdUsers });
})

module.exports = seedRouter