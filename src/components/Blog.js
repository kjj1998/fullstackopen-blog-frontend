/* eslint-disable linebreak-style */
import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, loggedInUser }) => {

  if (!blog)
    return null

  const own = blog.user.username === loggedInUser.username

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
      <div>added by {blog.user.name}</div>
      {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
      <h2>comments</h2>
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