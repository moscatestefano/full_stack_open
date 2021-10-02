import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ name, password, handleLogin, handleUser, handlePass }) => {

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
                    username: <input id="username" type="text" value={name} name="Username" onChange={({ target }) => handleUser(target.value)}/>
        </div>
        <div>
                    password: <input id="password" type="password" value={password} name="Password" onChange={({ target }) => handlePass(target.value)} />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUser: PropTypes.func.isRequired,
  handlePass: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login