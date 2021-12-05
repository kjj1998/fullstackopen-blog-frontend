/* eslint-disable linebreak-style */
import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getParticularBlog = async newObject => {
  const blogUrl = baseUrl + '/' + newObject.id
  const response = await axios.get(blogUrl, newObject)
  return response.data
}

const create = async (blog) => {

  const request = await axios.post(baseUrl, blog, getConfig())
  return request.data
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}


// const blogService = { getAll, create, setToken, incrementLikes, removeBlog, getParticularBlog }

const blogService = { getAll, getParticularBlog, create, update, remove }

export default blogService