const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../utils/list_helper').usersInDb

describe('when there is only one user in db', () => {

    beforeEach( async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('supersecret', 10)
        const user = new User({username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a new username', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Williamlolle',
            name: 'Stefano Moscatelli',
            password: 'stefanovskij'
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', '/application\/json/')

        const userAtEnd = await helper.usersInDb()
        expect(userAtEnd).toHaveLength(userAtStart+1)

        const usernames = userAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message upon posting duplicate of user', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Stefano Moscatelli',
            password: 'stefanovskij'
        }

        const result = await api
            .post('/api/users')
            .save(newUser)
            .expect(400)
            .expect('Content-Type', '/application\/json/')

        expect(result.body.error).toContain('to be unique')

        const usersAtEnd = await helper.usersInDb
        expect(usersAtEnd).toHaveLength(userAtStart.length)
    })
})