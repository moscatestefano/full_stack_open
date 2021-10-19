import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { loginFunction } from '../reducers/loginReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const Login = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(loginFunction(username, password))
    dispatch(initializeBlogs())
    history.push('/blogs')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
                    username: <input id="username" type="text" name="Username"/>
        </div>
        <div>
                    password: <input id="password" type="password" name="Password"/>
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login