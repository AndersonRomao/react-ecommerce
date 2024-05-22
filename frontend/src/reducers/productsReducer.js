import { createSlice } from "@reduxjs/toolkit";
import productService from '../services/products'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true
    },
    setProducts: (state, action) => {
      state.loading = false
      state.data = action.payload  
    },
    setMessage: (state, action) => {
      state.data.message = action.payload
    }
  }
})

export const initializeProducts = (filter) => {
  return async dispatch => {
    dispatch(startLoading())
    const products = await productService.getProducts(filter)
    dispatch(setProducts(products))
    }
}

export const productDetails = (id) => {
  return async (dispatch, getState) => {
    dispatch(startLoading())
    const { users } = getState()
    productService.setToken(users.data.token)
    const product = await productService.productData(id)
    dispatch(setProducts(product))
  }
}

export const postReview = (id, review) => {
  return async dispatch => {
    try {
      await productService.createReview(id, review)
    } catch(error) {
      dispatch(setMessage(error.response.data.message))  
      } 
  }
}

export const removeProduct = (id) => {
  return async (dispatch, getState) => {
    const { users } = getState()
    productService.setToken(users.data.token)
    const data = await productService.remove(id)
    dispatch(initializeProducts(""))
    console.log(data)
  }
}

export const updateProduct = (id, product) => {
  return async (dispatch, getState) => {
    const { users } = getState()
    productService.setToken(users.data.token)
    const data = await productService.update(id, product)
    dispatch(setProducts(data))
    console.log(data)
  }  
}

export const createProduct = (product) => {
  return async (dispatch, getState) => {
    const { users } = getState()
    productService.setToken(users.data.token)
    try {
      const data = await productService.create(product)
      dispatch(initializeProducts(""))
      console.log(data)
    } catch(error) {
       console.log(error) 
    }
  }
}

export const { startLoading, setProducts, setMessage } = productSlice.actions

export default productSlice.reducer