import axios from 'axios'

const baseUrl = '/api/login'

const logins = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { logins }