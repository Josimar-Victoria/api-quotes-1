const User = require('../models/UserModels')
const jwt = require('jsonwebtoken')

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return res.status(400).json({
      message: 'Por favor registrate'
    })
  }

  const decoded = await jwt.verify(token, process.env.SECRET)

  req.user = await User.findById(decoded._id)

  next()
}
