import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [user, setUser] = useState(null)

  useEffect(() => {
		async function fetchData() {
			const blogs = await blogService.getAll()
    	setBlogs( blogs )
		}
		fetchData()
  }, [])

	useEffect(() => {
		const loggedBlogAppUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedBlogAppUserJSON) {
			const user = JSON.parse(loggedBlogAppUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const blogFormRef = useRef()

	const login = async (username, password) => {
		try {
			const user = await loginService.login({username, password})
			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
			blogService.setToken(user.token)
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
			window.localStorage.removeItem('loggedBlogAppUser')
			setUser(null)
			blogFormRef.current.setTitle('')
			blogFormRef.current.setAuthor('')
			blogFormRef.current.setUrl('')

			setNotificationMessage('Successfully logged out')
			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)
		} catch(exception) {

		}
	}

	const createNewBlog = async (blogObject) => {
		try {
			const returnedBlog = await blogService.create(blogObject)
			blogFormRef.current.toggleVisibility()
			setBlogs(blogs.concat(returnedBlog))
			
			setNotificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added!`)
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

	const blogForm = () => (
		<Togglable buttonLabel='create new blog' ref={blogFormRef}>
						<CreateBlogForm createNewBlog={createNewBlog}/>
		</Togglable>
	)

	const loginForm = () => (
		<Togglable buttonLabel='login'>
			<LoginForm login={login}/>
		</Togglable>
	)

  return (
    <div>
			{ notificationMessage !== null ? 
				<Notification message={notificationMessage} flag={'notification'} /> :
				<Notification message={errorMessage} flag={'error'} />
			}
			{ user === null ?
				<div>
					{loginForm()}
				</div>
				:
				<div>
      		<h2>blogs</h2>
					<p>{`${user.name} logged in`} <button type="submit" onClick={handleLogout}>logout</button></p>
      		{blogForm()}
					{blogs.map(blog => {
						return <Blog key={blog.id} blog={blog}/>
					})
					}
      	</div>
			}
    </div>
  )
}

export default App