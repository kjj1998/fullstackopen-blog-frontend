/* eslint-disable linebreak-style */
const initialNotification = null
let timerID = null

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data.content
  case 'RESET':
    return initialNotification
  default:
    return state
  }
}

export const setNotification = (content) => {
  return async dispatch => {
    if (timerID !== null)
      clearTimeout(timerID)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content }
    })

    timerID = setTimeout(() => dispatch(reset()), 5000)
  }
}

export const reset = () => {
  return {
    type: 'RESET',
  }
}

export default notificationReducer