const Post = require('../models/PostModels')

exports.createPost = async (req, res) => {
  try {
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: 'req.body.public_id',
        url: 'req.body.url'
      },
      owner: req.user._id
    }

    const newPost = await Post.create(newPostData)

    res.status(200).json({
      success: true,
      post: newPost,
      message: 'Publicacion creada con exito'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
