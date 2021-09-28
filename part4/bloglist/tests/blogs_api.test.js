const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

/* tests are made on the test_db server */

const initializer = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
      }
]

beforeAll( async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initializer)
})

describe('tests with GET and DELETE methods', () => {

    test('blogs are returned as JSON and the length is correct', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
        expect(response.body).toHaveLength(3)
    }, 100000)
    
    test('the first blog is about React patterns', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body[0].title).toBe('React patterns')
    })

    test('async/await works fine on POST method with well-formed entries', async (req, res) => {

        const initial = await api.get('/api/blogs')
        const initialLenght = initial.body.length
        
        const token = req.token
        const user = req.user
        
        const newBlog = {
            title: "La Divina Commedia",
            author: "Dante Alighieri",
            url: "http://studidanteschi.it",
            likes: 777,
            userId: user.id
        }

        await api
        .post('/api/blogs')
        .set({ 'Authorization': token })
        .send(newBlog)

        const response = await api.get('/api/blogs')

        // checking if the length is updated
        const delId = response.body[initialLenght].id
        expect(response.body).toHaveLength(initialLenght + 1)

        // deleting the test entry
        await api
        .delete(`/api/blogs/${delId}`)
        .set({ 'Authorization': token })
    }, 10000)

    test('verifying that id is defined', async () => {

        const blogs = await api.get('/api/blogs')
        expect(blogs.body[0].id).toBeDefined()

    })

    test('missing likes from blogs', async (req, res) => {

        const token = req.token
        const user = req.user

        const newBlog = {
            title: "La Divina Commedia",
            author: "Dante Alighieri",
            url: "http://studidanteschi.it",
            userId: user.id
        }

        await api
        .post('/api/blogs')
        .set({ 'Authorization': token })
        .send(newBlog)

        const response = await api.get('/api/blogs')
        const len = response.body.length
        expect(response.body[len - 1].likes).toBe(0)
    })

    test('malformatted POST method', async (req, res) => {

        const token = req.token
        const user = req.user

        const newBlog = {
            url: "http://studidanteschi.it",
            likes: 777,
            userId: user.id
        }

        await api
        .post('/api/blogs')
        .set({ 'Authorization': token })
        .send(newBlog)
        .expect(400)

        const anotherBlog = {
            title: "La Divina Commedia",
            author: "Dante Alighieri",
            url: "http://studidanteschi.it",
            likes: 777,
            userId: user.id
        }

        await api
        .post('/api/blogs')
        .set({ 'Authorization': token })
        .send(anotherBlog)
        .expect(200)
    })
})

afterAll(() => {
    mongoose.connection.close()
})