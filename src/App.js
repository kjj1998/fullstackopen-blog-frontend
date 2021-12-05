/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

import { setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, newBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogin = async (username, password) => {
    try {
      dispatch(loginUser(username, password))
      dispatch(setNotification('Successfully logged in'))
      console.log(notification)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      dispatch(logoutUser())
      dispatch(setNotification('Successfully logged out'))
    } catch(exception) {
      console.log(exception)
    }
  }

  const createBlog = async (blog) => {
    try {
      dispatch(newBlog(blog))
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification(`A new blog ${blog.title} by ${blog.author} added!`))
    } catch(exception) {
      console.log(exception)
      setErrorMessage('Blog not added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blog)	=> {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`Likes of blog ${blog.title} by ${blog.author} increased by one!`))
    } catch(exception) {
      setErrorMessage('Likes not increased')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRemove = async (id) => {
    try {
      const blogToRemove = blogs.find(b => b.id === id)
      dispatch(removeBlog(blogToRemove))
      dispatch(setNotification(`${blogToRemove.title} by ${blogToRemove.author} removed!`))
    } catch(exception) {
      setErrorMessage('Blog not removed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>
        { notification !== null ?
          <Notification message={notification} flag={'notification'} /> :
          <Notification message={errorMessage} flag={'error'} />
        }
        <LoginForm login={handleLogin}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      { notification !== null ?
        <Notification message={notification} flag={'notification'} /> :
        <Notification message={errorMessage} flag={'error'} />
      }

      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}

export default App