/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'

const Blog = ({ blog, handleLike, handleRemove, loggedInUser, addComment }) => {
  const [comment, setComment ] = useState('')
  const navigate = useNavigate()
  if (!blog)
    return null

  const own = blog.user.username === loggedInUser.username

  const handleComment = (event) => {
    event.preventDefault()

    addComment(blog.id, comment)
    setComment('')
    navigate(`/blogs/${blog.id}`)
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
      <div>added by {blog.user.name}</div>
      {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
      <h2>comments</h2>
      <form onSubmit={handleComment}>
        <input
          id="comment"
          type="text"
          value={comment}
          name="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

Blog.displayName = 'Blog'

export default Blog