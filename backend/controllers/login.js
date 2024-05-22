const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userModel')

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).send({
      error: 'Invalid username or password'
    })
  }

  const userForToken = {
    name: user.name,
    email: user.email,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60})

  response
    .status(200)
    .send({ token, email: user.email, name: user.name, isAdmin: user.isAdmin })
})

module.exports = loginRouter