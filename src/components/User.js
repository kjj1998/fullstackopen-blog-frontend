/* eslint-disable linebreak-style */
import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const selectedUser = users.find( u => u.id === id)

  if (!selectedUser) {
    return null
  }

  return (
    <div>
      <h2>{selectedUser.name}</h2>
      <p><strong>added blogs</strong></p>
      <ul>
        {selectedUser.blogs.map( blog => {
          return (
            <li key={blog.id}>{blog.title}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default User