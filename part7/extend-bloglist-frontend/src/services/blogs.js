import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const tok = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, tok)
  return response.data
}

const vote = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const cancelBlog = async (id) => {
  const tok = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, tok)
  return response.data
}

const addComment = async (id, comment) => {
  const tok = { headers: { Authorization: token } }
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment, tok)
  return response.data
}

export default {
  setToken,
  getAll,
  create,
  vote,
  cancelBlog,
  addComment
}