/* eslint-disable linebreak-style */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const incrementLikes = async updatedObject => {
  const config = {
    headers: { Authorization: token },
  }

  const blogUrl = baseUrl + '/' + updatedObject.id
  const response = await axios.put(blogUrl, updatedObject, config)
  return response.data
}

const removeBlog = async objectToBeDeleted => {
  const config = {
    headers: { Authorization: token },
  }

  const blogUrl = baseUrl + '/' + objectToBeDeleted.id
  const response = await axios.delete(blogUrl, config, objectToBeDeleted)
  return response.data
}

const blogService = { getAll, create, setToken, incrementLikes, removeBlog }

export default blogService