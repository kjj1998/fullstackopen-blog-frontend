/* eslint-disable linebreak-style */
import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

/*
let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}
*/

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
  /*
	const config = {
    headers: { Authorization: token },
  }
	*/

  const request = await axios.post(baseUrl, blog, getConfig())
  return request.data
}

/*
const incrementLikes = async updatedObject => {
  const config = {
    headers: { Authorization: token },
  }

  const blogUrl = baseUrl + '/' + updatedObject.id
  const response = await axios.put(blogUrl, updatedObject, config)
  return response.data
}
*/

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return response.data
}

/*
const removeBlog = async objectToBeDeleted => {
  const config = {
    headers: { Authorization: token },
  }

  const blogUrl = baseUrl + '/' + objectToBeDeleted.id
  const response = await axios.delete(blogUrl, config, objectToBeDeleted)
  return response.data
}
*/

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}


// const blogService = { getAll, create, setToken, incrementLikes, removeBlog, getParticularBlog }

const blogService = { getAll, getParticularBlog, create, update, remove }

export default blogService