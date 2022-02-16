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
