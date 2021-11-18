/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  // const [showMore, setShowMore] = useState(false)
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  /*
  const toggleVisibility = () => {
    setShowMore(!showMore)
  }

  const increaseLikes = () => {
    incrementLikes(blog)
  }

  const remove = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      removeBlog(blog)
    }
  }
	*/

  const label = visible ? 'hide' : 'view'

  /*
  const RemoveButton = () => {
    return (
      <div>
        { nameOfCreator === blog.user.name ?
          <div>
            <button onClick={remove}>remove</button>
          </div>
          :
          null
        }
      </div>
    )
  }
	*/

  /*
  return (
    <div style={blogStyle} className='blog'>
      { showMore === false ?
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>
        :
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button> <br/>
          {blog.url} <br/>
				likes {blog.likes} <button id='like' onClick={increaseLikes}>like</button> <br/>
          {blog.user.name} <br/>
          <RemoveButton />
        </div>
      }
    </div>
  )
	*/

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author} <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={() => handleLike(blog.id)}>like</button></div>
          <div>{blog.user.name}</div>
          {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
        </div>
      )}
    </div>
  )
}

/*
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  incrementLikes: PropTypes.func.isRequired,
  nameOfCreator: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired
}*/

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

Blog.displayName = 'Blog'

export default Blog