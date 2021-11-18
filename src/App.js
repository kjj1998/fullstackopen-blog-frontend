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


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    async function fetchData() {
      const blogs = await blogService.getAll()
      sortBlogs(blogs)
      setBlogs( blogs )
    }
    fetchData()
  }, [])

  useEffect(() => {
    /*
		const loggedBlogAppUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedBlogAppUserJSON) {
      const user = JSON.parse(loggedBlogAppUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
		*/

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

      setNotificationMessage('Successfully logged in')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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

      setNotificationMessage('Successfully logged out')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch(exception) {
      console.log(exception)
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()

      const newListOfBlogs = blogs.concat(newBlog)
      sortBlogs(newListOfBlogs)
      setBlogs(newListOfBlogs)

      setNotificationMessage(`A new blog ${newBlog.title} by ${newBlog.author} added!`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch(exception) {
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
      /*
			const clone = JSON.parse(JSON.stringify(updatedBlogObject))
      clone.user = clone.user.id
      clone.likes += 1
      const returnedBlog = await blogService.incrementLikes(clone)
			*/
      await blogService.update(likedBlog)
      const updatedListOfBlogs = blogs.map(b =>
        b.id === id ?
          { ...blogToLike, likes: blogToLike.likes + 1 }
          : b )
      sortBlogs(updatedListOfBlogs)
      setBlogs(updatedListOfBlogs)

      setNotificationMessage(`Likes of blog ${blogToLike.title} by ${blogToLike.author} increased by one!`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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
      const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
      if (ok) {
        await blogService.remove(id)
        const newListOfBlogs = blogs.filter(b => b.id !== id)
        sortBlogs(newListOfBlogs)
        setBlogs(newListOfBlogs)
      }

      setNotificationMessage(`${blogToRemove.title} by ${blogToRemove.author} removed!`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch(exception) {
      console.log(exception)
      setErrorMessage('Blog not removed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  /*
  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <CreateBlogForm createBlog={createNewBlog}/>
    </Togglable>
  )
	*/

  /*
	const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm login={handleLogin}/>
    </Togglable>
  )*/

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>
        { notificationMessage !== null ?
          <Notification message={notificationMessage} flag={'notification'} /> :
          <Notification message={errorMessage} flag={'error'} />
        }
        <LoginForm login={handleLogin}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      { notificationMessage !== null ?
        <Notification message={notificationMessage} flag={'notification'} /> :
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

  /*
  return (
    <div>
      { notificationMessage !== null ?
        <Notification message={notificationMessage} flag={'notification'} /> :
        <Notification message={errorMessage} flag={'error'} />
      }
      { user === null ?
        <div>
          <LoginForm login={login}/>
        </div>
        :
        <div>
          <h2>blogs</h2>
          <p>{`${user.name} logged in`} <button type="submit" onClick={handleLogout}>logout</button></p>
          {blogForm()}
          <div id='blogList'>
            {blogs.map(blog => {
              return <Blog className="blog" key={blog.id}
                blog={blog}
                incrementLikes={incrementLikes}
                nameOfCreator={user.name}
                removeBlog={removeBlog}/>
            })
            }
          </div>
        </div>
      }
    </div>
  )
	*/
}

export default App