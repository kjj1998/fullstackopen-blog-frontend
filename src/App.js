import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [user, setUser] = useState(null)


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
			
			setTimeout(() => {
				setNotificationMessage(null)
			}, 5000)
		} catch(exception) {

		}
	}

  return (
    <div>
			{ notificationMessage !== null ? 
				<Notification message={notificationMessage} flag={'notification'} /> :
				<Notification message={errorMessage} flag={'error'} />
			}
			{ user === null ?
				<LoginForm 
					handleLogin={handleLogin}
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
				/> :
				<div>
      		<h2>blogs</h2>
					<p>{`${user.name} logged in`} <button type="submit" onClick={handleLogout}>logout</button></p>
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