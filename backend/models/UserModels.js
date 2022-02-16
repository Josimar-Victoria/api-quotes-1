const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingresa un nombre']
  },

  avatar: {
    public_id: String,
    url: String
  },

  email: {
    type: String,
    required: [true, 'Por favor ingresa un corre eletronico'],
    unique: [true, 'Este correo eletronico ya existe']
  },
  password: {
    type: String,
    required: [true, 'Por favor ingresa tu password'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false
  },
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  },
  verify: {
    type: Boolean,
    default: false
  },
  enable: {
    type: Boolean,
    default: true
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

module.exports = mongoose.model('User', userSchema)
