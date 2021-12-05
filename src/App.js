/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import storage from './utils/storage'

import { setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, newBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  // const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    if (user)
      setUser(user)
  }, [])

  const sortBlogs = (blogs) => {
    blogs.sort(function(a, b) {
      if (a.likes < b.likes) {
        return 1
      }
      if (a.likes > b.likes) {
        return -1
      }
      return 0
    })
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      storage.saveUser(user)
      setUser(user)

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
      setUser(null)
      storage.logoutUser()

      dispatch(setNotification('Successfully logged out'))

    } catch(exception) {
      console.log(exception)
    }
  }

  const createBlog = async (blog) => {
    try {
      dispatch(newBlog(blog))
      blogFormRef.current.toggleVisibility()

      // const newListOfBlogs = blogs.concat(newBlog)
      // sortBlogs(newListOfBlogs)
      // setBlogs(newListOfBlogs)

      dispatch(setNotification(`A new blog ${blog.title} by ${blog.author} added!`))
    } catch(exception) {
      console.log(exception)
      setErrorMessage('Blog not added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (id)	=> {
    try {
      const blogToLike = blogs.find(b => b.id === id)
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }

      await blogService.update(likedBlog)
      const updatedListOfBlogs = blogs.map(b =>
        b.id === id ?
          { ...blogToLike, likes: blogToLike.likes + 1 }
          : b )
      sortBlogs(updatedListOfBlogs)
      // setBlogs(updatedListOfBlogs)

      dispatch(setNotification(`Likes of blog ${blogToLike.title} by ${blogToLike.author} increased by one!`))
    } catch(exception) {
      console.log(exception)
      setErrorMessage('Likes not increased')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRemove = async (id) => {
    try {
      const blogToRemove = blogs.find(b => b.id === id)
      const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
      if (ok) {
        await blogService.remove(id)
        const newListOfBlogs = blogs.filter(b => b.id !== id)
        sortBlogs(newListOfBlogs)
        // setBlogs(newListOfBlogs)
      }

      dispatch(setNotification(`${blogToRemove.title} by ${blogToRemove.author} removed!`))
    } catch(exception) {
      console.log(exception)
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