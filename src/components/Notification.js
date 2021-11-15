/* eslint-disable linebreak-style */
import React from 'react'

const Notification = ({ message, flag }) => {
  if (message === null) {
    return null
  }

  if (flag === 'error') {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else {
    return (
      <div className="notify">
        {message}
      </div>
    )
  }
}

Notification.displayName = 'Notification'

export default Notification