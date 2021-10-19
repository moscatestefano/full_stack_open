const notificationReducer = (state = { notification: null }, action) => {
  console.log('STATE', state, 'ACTION', action)

  switch(action.type) {
  case 'SET': {
    clearTimeout(state.delay)
    return action.data.message
  }
  case 'REMOVE': {
    return { notification: null }
  }
  default:
    return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: {
        message,
        delay: setTimeout(() => {
          dispatch(removeNotification())
        }, time * 1000)
      }
    })
  }
}

export const removeNotification = () => {
  return { type: 'REMOVE' }
}

export default notificationReducer