/* eslint-disable linebreak-style */
import React from 'react'
import { Link } from 'react-router-dom'

import NewBlog from './NewBlog'
import Togglable from './Togglable'

const IndexPage = ({ blogFormRef, createBlog, blogs }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog => {
        return (
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`} >
              {blog.title} {blog.author}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default IndexPage