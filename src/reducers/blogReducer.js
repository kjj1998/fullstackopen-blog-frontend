/* eslint-disable linebreak-style */
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data.sort(byLikes)
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG': {
    const likedBlog = action.data
    const updatedBlogs = state.map(
      blog => blog.id !== likedBlog.id ? blog : likedBlog)
    return updatedBlogs.sort(byLikes)
  }
  case 'REMOVE_BLOG': {
    const removedBlog = action.data
    return state.filter(blog => blog.id !== removedBlog.id)
  }
  case 'ADD_COMMENT': {
    const commentedBlogs = state.map(
      blog =>
        blog.id === action.data.id ?
          blog.comments.concat(action.data.comment)
          : blog
    )
    return commentedBlogs
  }
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

export const likeBlog = (blog) => {
  return async dispatch => {
    const userObject = blog.user
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    await blogService.update(likedBlog)
    likedBlog.user = userObject
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

export const removeBlog = (blogToRemove) => {
  return async dispatch => {
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(blogToRemove.id)
    }

    dispatch({
      type: 'REMOVE_BLOG',
      data: blogToRemove
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const commentObject = { comment }
    await blogService.addComment(id, commentObject)
    dispatch({
      type: 'ADD_COMMENT',
      data: {
        comment,
        id
      }
    })
  }
}

export default blogReducer