import express from 'express'
import cors from 'cors'
import patientsRouter from './src/routes/patients'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/api/ping', (_req, res) => {
    console.log('someone just pinged')
    res.send('pong')
})

app.use(patientsRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})