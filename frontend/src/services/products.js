import axios from "axios";

const baseUrl = "http://localhost:5000/api/products"

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getCategories = async () => {
  const response = await axios.get(`${baseUrl}/categories`)
  return response.data 
}

const getProducts = async (filter) => {
  const response = await axios.get(`${baseUrl}?search=${filter}`)
  return response.data
}

const productData = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createReview = async (id, review) => {
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: token}
  }
  const response = await axios.post(`${baseUrl}/${id}/reviews`, review, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token 
      }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = async (id, product) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token  
    }
  }  
  const response = await axios.put(`${baseUrl}/${id}`, product, config)
  return response.data
}

const create = async (product) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token  
    }
  }
  const response = await axios.post(baseUrl, product, config) 
  console.log(response.data)
  return response.data 
}

export default { getCategories, getProducts, productData, createReview, setToken, remove, update, create }