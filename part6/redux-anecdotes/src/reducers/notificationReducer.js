const notificationReducer = (state = null, action) => {
  if (action.type === 'SHOW')
    console.log("NOTIFY", action)
    switch (action.type) {
      case 'SHOW': {
        if (state !== null)
          clearTimeout(state.timeOut)
        return action.alert.notification
      }
      case 'HIDE':
        return action.alert
      default:
        return state
    }
  }

export const setNotification = (notification, timeToFade) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      alert: { 
        notification,
        timeOut: setTimeout(() => {
          dispatch(hideNotification())
        }, timeToFade * 1000)
      }
    })
  }
}

export const hideNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'HIDE',
      alert: null
    })
  }
}

export default notificationReducer