const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      minLength: 3,
      required: true
    },
    author: {
      type: String,
      minlength: 3,
      required: true
    },
    url: {
      type: String,
      minlength: 8,
      required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
      type: Number,
      minlength: 1,
      required: true,
      default: 0
    }
  })

  blogSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Blog', blogSchema)