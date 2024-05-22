const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('Authorization')
  if(authorization && authorization.startsWith('Bearer ')) {
    try {
      const decodedToken = jwt.verify(authorization.replace('Bearer ', ''), process.env.SECRET)
      req.user = await User.findById(decodedToken.id)
      
    } catch {
      return res.status(401).send({ error: 'token invalid '})
    }
  } else {
    return res.status(401).send({ error: 'token missing'})
  }
  next()
}

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).send({ error: 'Not authorized as an admin' })
  }
}


module.exports = { tokenExtractor, admin }