import axios from 'axios'

const getId = () => {
    return (Math.random() * 10000).toFixed(0)
}

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = {
        content: content,
        id: getId(),
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async objectToUpdate => {
    const response = await axios.put(`${baseUrl}/${objectToUpdate.id}`, objectToUpdate)
    return response.data
  }

export default { getAll, createNew, update }