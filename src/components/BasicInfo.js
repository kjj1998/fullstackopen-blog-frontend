/* eslint-disable linebreak-style */
import React from 'react'

const BasicInfo = ({ allUsers }) => {
  return(
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th><strong>blogs created</strong></th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map(u => {
            return (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.blogs.length}</td>
              </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default BasicInfo