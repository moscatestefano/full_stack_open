require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./models/person')
const { token } = require('morgan')
const morgan = require('morgan')
const cors = require('cors')
const e = require('express')

const app = express()

morgan.token('content', function(req, res) {return JSON.stringify(req.body)})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan((function (tokens, req, res) {
  if (tokens.method(req,res) === 'POST'){
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['content'](req,res)
    ].join(' ')
  } else {
    return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    req.body.content
   ].join(' ')
  }})))


// GET (overridden by build)
app.get('/', (request, response) => {
    response.send('<h1>Welcome to the book of numbers</h1>')
  })

//TODO get db length
app.get('/info', (request, response) => {
    
    let makeCount = () => {
      Person.countDocuments({}, (err, count) => {
        if (count) {
          response.send(
            `<p>Phonebook has info for ${count} people</p>
            <p>Request in date: ${new Date()}</p>`
          )
        } else {
          console.log(err)
        }})}
    
        makeCount()
})
  
app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
      response.json(person)
    })
  })

app.get('/api/persons/:id', (request, response, next) => {

    const id = request.params.id

    Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// POST
app.post('/api/persons', (request, response, next) => {
    
  const body = request.body
  
    /*if (!body) {
      return response.status(400).json({
        error: 'Content missing'
      })
    } else if (!body.name || body.name.trim() === "") {
        return response.status(400).json({
          error: 'Name missing'
        })
      } else if (!body.number || body.number.trim() === "") {
        return response.status(400).json({
          error: 'Number missing'
        })
      }*/

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(err => next(err))
  })

// PUT
app.put('/api/persons/:id', (request, response, next) => {
  
  const body = request.body

  const person = {
    name : body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(body.id, person, {runValidators: true, new: true})
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})

// DELETE
app.delete('/api/persons/:id', (request, response, next) => {

    const id = request.params.id
    Person.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
    
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
  }

  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
      return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === 'ValidationError') {
      return response.status(400).send({ error: error.message })
    }

    next(error)
  }

  app.use(errorHandler)

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })