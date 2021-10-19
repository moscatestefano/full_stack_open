import loginService from '../services/login'

const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedInBloglistAppUser')) // occhio qui

const initialState = loggedUserJSON ? loggedUserJSON : null

const loginReducer = (state = initialState, action) => {
  console.log('STATE', state, 'ACTION', action)

  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const loginFunction = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  return ({ type: 'LOGOUT' })
}

export default loginReducer