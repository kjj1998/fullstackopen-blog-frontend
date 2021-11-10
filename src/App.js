import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [user, setUser] = useState(null)
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [author, setAuthor] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

	useEffect(() => {
		const loggedBlogAppUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedBlogAppUserJSON) {
			const user = JSON.parse(loggedBlogAppUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		
		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(user)
			)

			blogService.setToken(user.token)
			setUser(user)
			setNotificationMessage('Successfully logged in')
			setUsername('')
			setPassword('')
			
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
			setNotificationMessage('Successfully logged out')
			setTitle('')
			setAuthor('')
			setUrl('')
			
			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)
		} catch(exception) {

		}
	}

	const handleCreateNewBlog = async (event) => {
		event.preventDefault()

		try {
			const blogObject = {
				title: title,
				author: author,
				url: url
			}

			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			setNotificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added!`)
			setTitle('')
			setAuthor('')
			setUrl('')
			
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

  return (
    <div>
			{ notificationMessage !== null ? 
				<Notification message={notificationMessage} flag={'notification'} /> :
				<Notification message={errorMessage} flag={'error'} />
			}
			{ user === null ?
				<div>
					<LoginForm 
						handleLogin={handleLogin}
						username={username}
						setUsername={setUsername}
						password={password}
						setPassword={setPassword}
					/>
				</div>
				:
				<div>
      		<h2>blogs</h2>
					<p>{`${user.name} logged in`} <button type="submit" onClick={handleLogout}>logout</button></p>
      		<CreateBlogForm
						handleCreateNewBlog={handleCreateNewBlog}
						title={title}
						author={author}
						url={url}
						setTitle={setTitle}
						setAuthor={setAuthor}
						setUrl={setUrl}
					/>
					{blogs.map(blog => {
						return <Blog key={blog.id} blog={blog} />
					})
					}
      	</div>
			}
    </div>
  )
}

export default App