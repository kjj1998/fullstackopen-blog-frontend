/* eslint-disable linebreak-style */
import React from 'react'

const BlogView = ({ blog }) => {
  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}/>
      <p>{blog.likes} likes <button>like</button></p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default BlogView