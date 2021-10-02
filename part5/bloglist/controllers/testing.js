const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/api/testing/reset', async (request, response) => {
    await Blog.deleteMany({})

    response.status(204).end()
})

module.exports = router