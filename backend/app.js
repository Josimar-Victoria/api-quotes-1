const express = require('express')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: 'backend/config/config.env' })
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Importacion de Routas
const post = require('./routes/postRouter')
const user = require('./routes/userRouter')

// Uso de rutas
app.use('/api/v1', post)
app.use('/api/v1', user)

module.exports = app
