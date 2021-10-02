const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const usersRouter = require('./users')
const { userExtractor } = require('../utils/middleware')

// GET (from static build)
blogsRouter.get('/api/blogs', async (request, response, next) => {
  const resp = await Blog.find({}).populate('userId')
  response.json(resp)
})

blogsRouter.get('/api/blogs/:id', async (request, response, next) => {

    const bp = await Blog.findById(request.params.id)
    if (bp) {
        response.json(bp)
    } else {
        response.status(404).end()
    }

  })

// POST
blogsRouter.post('/api/blogs', userExtractor, async (request, response, next) => {
    
  const body = request.body

  const user = request.user

    const blogpost = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      userId: user._id
    })

    const resp = await blogpost.save()
    
    user.blogs = user.blogs.concat(resp._id)
    await user.save()
    response.json(resp)

  })

// PUT

blogsRouter.put('/api/blogs/:id', async (request, response, next) => {

  const newBlog = {
    likes: request.body.likes,
    blogs: request.body.blogs
  }

  const resp = await Blog.findByIdAndUpdate(request.body.id, newBlog, {runValidators: true, new: true})
  response.json(resp)

})

// DELETE
blogsRouter.delete('/api/blogs/:id', userExtractor, async (request, response, next) => {

    const user = request.user

    const blogToDelete = await Blog.findById(request.params.id)
    
    if (blogToDelete.userId.toString() === user.id.toString()){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'This user is not allowed to delete the blog.' })
    }
      
  })

module.exports = blogsRouter