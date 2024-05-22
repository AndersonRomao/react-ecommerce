import { createSlice } from "@reduxjs/toolkit";

import productService from '../services/products'

const productSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    setCategories: (state, action) => {
      return action.payload
    }
  }
})

export const initializeCategories = () => {
  return async dispatch => {
    const categories = await productService.getCategories()
    dispatch(setCategories(categories))
  }
}

export const { setCategories } = productSlice.actions

export default productSlice.reducer