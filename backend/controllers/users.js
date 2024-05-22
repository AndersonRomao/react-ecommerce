const userRouter = require('express').Router()
const User = require('../models/userModel')
const { tokenExtractor, admin } = require('../utils/middleware')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userRouter.get('/', tokenExtractor, admin, async(req, res) => {
    const users = await User.find({});
    res.json(users);
});

userRouter.get('/user/:id', tokenExtractor, admin, async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")
    if (user) {
      res.json(user)
    } else {
       res.status(404).send({ message: "User not found!"}) 
    }
}); 

userRouter.get('/profile', tokenExtractor, async(req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        const userForToken = {
            name: user.name,
            email: user.email,
            id: user._id,
          }
        const token = jwt.sign(userForToken, process.env.SECRET)
        res.status(200).send({
            name: user.name, 
            email: user.email,
            isAdmin: user.isAdmin, 
            orders: user.orders,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token,
            id: user._id
        })
    } else {
        res.status(404).end()
    }
});

userRouter.post('/', async(req, res) => {
     const { name, email, password } = req.body

     if(name && email && password) {
     const passwordHash = bcrypt.hashSync(password, 10)
     const user = new User({
        name,
        email,
        password: passwordHash
    });

    const userForToken = {
        name: user.name,
        email: user.email,
        id: user._id,
      }
      const token = jwt.sign(userForToken, process.env.SECRET)
      user.save();
      res.status(201).send({token, email: user.email, name: user.name});
    } else {
        return res.status(400).send({message: "Invalid user data."})
      }
});

userRouter.put('/profile', tokenExtractor, async(req, res) => {
    const { name, email, password, isAdmin } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
        const userForToken = {
            name: user.name,
            email: user.email,
            id: user._id,
        }
        const token = jwt.sign(userForToken, process.env.SECRET)

        user.name = name || user.name
        user.email = email || user.email
        user.isAdmin = Boolean(isAdmin) || user.isAdmin
        if (password) {
            user.password = password
        }
    await user.save()

    res.status(200).send({
        name: user.name, 
        email: user.email,
        isAdmin: user.isAdmin, 
        orders: user.orders,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token,
        id: user._id,
        message: "User updated!"
    })

    } else {
        return res.status(400).send({message: 'User not found!'})
    }
});

userRouter.put('/:id', tokenExtractor, admin, async(req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name
        user.isAdmin = req.body.isAdmin
       
    await user.save()
    res.status(201).send({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      orders: user.orders,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      id: user._id,
      isAdmin: user.isAdmin,
    })

    } else {
        return res.status(400).send({message: 'User not found!'})
    }
});

userRouter.delete('/:id', tokenExtractor, admin, async(req, res) => {
    const user = await User.findById(req.params.id);
    if(user) res.status(201).send({message: 'User found and is all ok!'})
    /*if (user) {
        await user.deleteOne()
        res.status(201).send({ message: 'User deleted!'});
    } else {
        res.status(404).send({ message: 'User not found!'})
    }*/
})

module.exports = userRouter