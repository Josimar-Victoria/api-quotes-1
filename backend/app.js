const express = require('express')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: 'backend/config/config.env' })
}

// Importacion de Routas
const post = require('./routes/postRouter')

// Uso de rutas
app.use('/api/v1', post)

module.exports = app
