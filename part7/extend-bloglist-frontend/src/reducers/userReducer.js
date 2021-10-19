import userService from '../services/users'

const userReducer = (state = null, action) => {
  console.log('STATE', state, 'ACTION', action)

  switch(action.type) {
  case 'ON_INIT_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeAllUsers = () => {
  return async dispatch => {
    const allUsers = userService.getAll()
    dispatch({
      type: 'ON_INIT_USERS',
      data: allUsers
    })
  }
}

export default userReducer