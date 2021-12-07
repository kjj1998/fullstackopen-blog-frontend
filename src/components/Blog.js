/* eslint-disable linebreak-style */
import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, loggedInUser }) => {
  // const [visible, setVisible] = useState(false)


  // const label = visible ? 'hide' : 'view'
  const own = blog.user.username === loggedInUser.username

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
      <div>added by {blog.user.name}</div>
      {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

Blog.displayName = 'Blog'

export default Blog