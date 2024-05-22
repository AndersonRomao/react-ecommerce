import axios from "axios";

const baseUrl = 'http://localhost:5000/api/orders'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async (order) => {
  const config = {
   headers: { 
    'Content-Type': 'application/json',
    Authorization: token
   }
  }
  const response = await axios.post(baseUrl, order, config)
  return response.data
}

const getOrderDetails = async (id) => {  
  const config = {
   headers: { 
    'Content-Type': 'application/json',
    Authorization: token
   }
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  console.log(response.data)
  return response.data
}

export default { create, getOrderDetails, setToken }