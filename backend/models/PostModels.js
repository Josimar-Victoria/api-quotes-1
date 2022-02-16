const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  caption: String,

  userPhoto: {
    public_id: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  image: {
    public_id: String,
    url: String
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  userDisplayName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],

  popular: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Post', postSchema)
