/* eslint-disable linebreak-style */
import React, { useEffect } from 'react'
import {
  Routes , Route,
  useMatch, useNavigate, Link
} from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BasicInfo from './components/BasicInfo'
//import BlogView from './components/BlogView'
import Blog from './components/Blog'

import { setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, newBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import { setError } from './reducers/errorReducer'
import { initializeUsers } from './reducers/allUsersReducer'
import IndexPage from './components/IndexPage'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const error = useSelector(state => state.error)
  const allUsers = useSelector(state => state.allUsers)

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogin = async (username, password) => {
    try {
      dispatch(loginUser(username, password))
      dispatch(setNotification('Successfully logged in'))
    } catch (exception) {
      console.log(exception)
      dispatch(setError('Wrong credentials'))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      dispatch(logoutUser())
      dispatch(setNotification('Successfully logged out'))
    } catch(exception) {
      console.log(exception)
      dispatch(setError('Unable to logout'))
    }
  }

  const createBlog = async (blog) => {
    try {
      dispatch(newBlog(blog))
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification(`A new blog ${blog.title} by ${blog.author} added!`))
    } catch(exception) {
      console.log(exception)
      dispatch(setError('Blog not added'))
    }
  }

  const handleLike = async (blog)	=> {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`Likes of blog ${blog.title} by ${blog.author} increased by one!`))
    } catch(exception) {
      console.log(exception)
      dispatch(setError('Likes not increased'))
    }
  }

  const handleRemove = async (id) => {
    try {
      const blogToRemove = blogs.find(b => b.id === id)
      dispatch(removeBlog(blogToRemove))
      dispatch(setNotification(`${blogToRemove.title} by ${blogToRemove.author} removed!`))
      navigate('/')
    } catch(exception) {
      console.log(error)
      dispatch(setError('Blog not removed'))
    }
  }

  const userIDMatch = useMatch('/users/:id')
  const matchedUser = userIDMatch
    ? allUsers.find(u => u.id === userIDMatch.params.id)
    : null

  const blogIDMatch = useMatch('/blogs/:id')
  const matchedBlog = blogIDMatch
    ? blogs.find(b => b.id === blogIDMatch.params.id)
    : { title: 'null', author: 'null', url: 'null' }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>
        { notification !== null ?
          <Notification message={notification} flag={'notification'} /> :
          <Notification message={error} flag={'error'} />
        }
        <LoginForm login={handleLogin}/>
      </div>
    )
  }

  const padding = { padding: 5 }

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ?
          <span>
            <em>{user.name} logged in</em><button onClick={handleLogout}>logout</button>
          </span>
          : <div></div>
        }
      </div>

      <h2>blog app</h2>
      { notification !== null ?
        <Notification message={notification} flag={'notification'} /> :
        <Notification message={error} flag={'error'} />
      }

      <Routes>
        <Route path="/users/:id" element={<User user={matchedUser} />} />
        <Route path="/blogs/:id"
          element={<Blog
            blog={matchedBlog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            loggedInUser={user} />} />
        <Route path="/users" element={<BasicInfo allUsers={allUsers}/>} />
        <Route path="/" element={
          <IndexPage
            blogFormRef={blogFormRef}
            createBlog={createBlog}
            blogs= {blogs}
            handleLike = {handleLike}
            handleRemove = {handleRemove}
            user = {user} />}
        />
      </Routes>
    </div>
  )
}

export default App