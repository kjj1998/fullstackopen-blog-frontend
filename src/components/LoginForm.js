/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ login }) => {
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
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button variant="primary" type="submit">
					login
        </Button>
      </Form.Group>
    </Form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm