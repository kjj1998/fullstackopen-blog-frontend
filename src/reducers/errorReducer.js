/* eslint-disable linebreak-style */
const initialError = null

const errorReducer = (state=initialError, action) => {
  switch(action.type) {
  case 'SET_ERROR':
    return action.data
  case 'RESET':
    return null
  default:
    return state
  }
}

export const setError = (message) => {
  return async dispatch => {
    dispatch({
      type: 'SET_ERROR',
      data: message
    })
    setTimeout(() => dispatch(reset()), 5000)
  }
}

export const reset = () => {
  return async dispatch => {
    dispatch({
      type: 'RESET',
    })
  }
}

export default errorReducer