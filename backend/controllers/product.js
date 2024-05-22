const productsRouter = require('express').Router()
const Product = require('../models/productModel')
const { tokenExtractor, admin  } = require('../utils/middleware')

productsRouter.get('/', async(req, res) => {
  const search = req.query.search || "";
    let products 
    const category = await Product.find({"category.name":{$regex: search, $options: 'i'}})
    products = category.length === 0 ?  await Product.find({"name": {$regex: search, $options: "i"}}) : category;
    res.json(products);
})  

productsRouter.get('/categories', async(req, res) => {
    const response = await Product.aggregate([{$group:{_id:{name:"$category.name", image:"$category.image"}}},
    ]).sort({_id: 1})
    res.json(response);
    
});

productsRouter.get('/:id', async (req, res, next) => {
  Product.findById(req.params.id).then( product => {
    if(product) {
        res.json(product)
    } else {
        res.status(404).end()
    }
    }).catch(error => next(error));
});

productsRouter.post('/', tokenExtractor, admin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    numReviews: req.body.numReviews,
    description: req.body.description,
  });
  if(product) {
    //const savedProduct = await product.save();
    //res.status(201).send(savedProduct)
    res.send({
      product,
      message: "Product created!"})
  } else { 
    res.status(500)
  }
});

productsRouter.post('/:id/reviews', tokenExtractor, async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if(product) {
    if(product.reviews.find((review) => 
    review.user.toString() === req.user._id.toString())) {
        return res.status(400).send({ message: 'You already submitted a review'})
    };

  if(rating && comment) {
    const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;

  await product.save();
  res.status(201).send({ message: 'Review created'});
  } else {
    res.status(400).send({message: 'Invalid data!'})
  }
  } else {
    res.status(404).send({ message: 'Product not found'});
    }
});

productsRouter.put('/:id', tokenExtractor, admin, async(req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.description = req.body.description || product.description;
    //await product.save();
    res.send({
      name: product.name,
      price: product.price,
      image: product.image,
      category: {name: product.category.name, image: product.category.image},
      brand: product.brand,
      countInStock: product.countInStock,
      description: product.description, 
      message: 'Product Updated' });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
        }
});

productsRouter.delete('/:id', tokenExtractor, admin, async (req, res) => {
  const product = await Product.findById(req.params.id);
   if (product) {
    //await product.remove();
    res.status(201).send({ message: 'Product Deleted!' });
    } else {
      res.status(404).send({ message: 'Product Not Found!' });
    }
});

module.exports = productsRouter
  
      