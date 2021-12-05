/* eslint-disable linebreak-style */
import storage from '../utils/storage'
import loginService from '../services/login'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'INIT_USER':
    return action.data
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return action.data
  default:
    return state
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const user = storage.loadUser()
    dispatch({
      type: 'INIT_USER',
      data : user
    })
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    storage.saveUser(user)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    storage.logoutUser()
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

export default userReducer