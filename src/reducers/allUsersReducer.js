/* eslint-disable linebreak-style */
import userService from '../services/user'

const allUsersReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data : users
    })
  }
}

export default allUsersReducer