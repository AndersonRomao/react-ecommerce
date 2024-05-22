import axios from 'axios'

const baseUrl = "http://localhost:5000/api"

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  console.log(response.data)
  return response.data 
}

const create = async (name, email, password) => {
  const response = await axios.post(`${baseUrl}/users`, { name, email, password })
  console.log(response.data)
  return response.data
}

const getProfile = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token 
      }
  }
  const response  = await axios.get(`${baseUrl}/users/profile`, config)
  return response.data
}

const getUser = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  }
  const response = await axios.get(`${baseUrl}/users/user/${id}`, config)
  return response.data 
}

const updateUserAccount = async (name, email, password) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  }
  const response = await axios.put(`${baseUrl}/users/profile`, { name, email, password }, config)
  return response.data
}

const updateUser = async (id, name, email, isAdmin) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token  
    }
  } 
  const response = await axios.put(`${baseUrl}/users/${id}`, { name, email, isAdmin }, config)
  console.log(response.data)
  return response.data
}

const usersList = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }  
  }
  const response = await axios.get(`${baseUrl}/users`, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token  
    }
  }
  const response = await axios.delete(`${baseUrl}/users/${id}`, config)
  return response.data
}

export default { login, create, getProfile, setToken, updateUserAccount, usersList, remove, getUser, updateUser } 