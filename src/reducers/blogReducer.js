/* eslint-disable linebreak-style */
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data.sort(byLikes)
  case 'NEW_BLOG':
    return [...state, action.data].sort(byLikes)
  default:
    return state
  }
}

const byLikes = (b1, b2) => b2.likes - b1.likes

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const newBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export default blogReducer