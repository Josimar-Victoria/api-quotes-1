const User = require('../models/UserModels')

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: 'Este usuario ya existe' })
    }

    // avatar: req.file.path
    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: 'prueva', url: 'prueva' }
    })

    res.status(201).json({
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Este usuario no existe'
      })
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(400).json({
        message: 'Tu contraseña es incorrecta',
        success: false
      })
    }

    const token = await user.generateToken()

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }

    res
      .status(201)
      .cookie('token', token)
      .json({ success: true, user, token })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
