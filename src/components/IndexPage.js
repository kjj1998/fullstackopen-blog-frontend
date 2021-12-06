/* eslint-disable linebreak-style */
import React from 'react'

import Blog from './Blog'
import NewBlog from './NewBlog'
import Togglable from './Togglable'

const IndexPage = ({ blogFormRef, createBlog, handleLike, handleRemove, user, blogs }) => {
  return (
    <div>
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}

export default IndexPage