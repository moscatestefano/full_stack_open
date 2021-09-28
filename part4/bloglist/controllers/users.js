const usersRouter = require('express').Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')

// POST
usersRouter.post('/api/users', async (request, response) => {
    const body = request.body
    
    if (body.password.length < 3 || body.username.length < 3)
        return response.status(401).json({ error: "Password and/or username are too short."})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
        blogs : [ ]
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

// GET
usersRouter.get('/api/users', async (request, response) => {
    const resultingUsers = await User.find({}).populate('blogs')
    response.json(resultingUsers)
})

usersRouter.get('/api/users/:id', async (request, response) => {
    const resultingUser = await User.find({_id: request.params.id})
    if (resultingUser)
        response.json(resultingUser)
    else {
        response.status(404).end()
    }
})

module.exports = usersRouter