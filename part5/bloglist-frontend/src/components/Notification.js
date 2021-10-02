import React from 'react'

const Notification = ({ className, message }) => {

  if ((message === null) || (message === ''))
    return null
  if (className === 'error') {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
}

export default Notification