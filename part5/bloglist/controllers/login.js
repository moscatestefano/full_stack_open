const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/api/login', async (request, response) => {
    const body = request.body

    const user = await User.find({ username: body.username })
    
    const correctPassword = user === null
    ? false
    : await bcrypt.compare(body.password, user[0].passwordHash)

    if (!(user && correctPassword)) {
        return response.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = {
        username: user.username,
        id: user[0]._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    
    response
    .status(200)
    .send({ token, username: user[0].username, name: user[0].name })
})

module.exports = loginRouter