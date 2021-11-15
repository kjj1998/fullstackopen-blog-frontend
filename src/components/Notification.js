/* eslint-disable linebreak-style */
import React from 'react'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
  message: PropTypes.string.isRequired
}

Notification.displayName = 'Notification'

export default Notification