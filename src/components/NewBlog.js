/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
					title:
          <input
            id='title'
            value={title}
            type='text'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
					author
          <input
            id='author'
            value={author}
            type='text'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
					url
          <input
            id='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create' type='submit'>create</button>
      </form>
    </div>
  )}

NewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

NewBlog.displayName = 'NewBlog'

export default NewBlog