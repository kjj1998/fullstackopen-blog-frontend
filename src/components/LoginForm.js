import React, { useState } from "react";

const LoginForm = ({login}) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	/* event handler to deal with login */
	const handleLogin = (event) => {
		event.preventDefault()	// prevetn default behavior
		
		/* send credentials to the login service */
		login(username, password)
		setUsername('')
		setPassword('')
	}

	return (
		<form onSubmit={handleLogin}>
			<h2>Log in to application</h2>
			<div>
				username
					<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
					<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)
}

export default LoginForm