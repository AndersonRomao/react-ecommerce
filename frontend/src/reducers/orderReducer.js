import { createSlice } from "@reduxjs/toolkit";
import orderService from '../services/order';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    data: {},
    error: false,
    loading: false
  },
  reducers: {
    startLoading: (state, action) => {
      state.loading = true
    },
    setOrder: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false
    },
    setOrderWithError: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = true
    }
  }
})

export const saveOrder = (order) => {
  return async (dispatch, getState) => {
    try {
     const { users } = getState()
     orderService.setToken(users.data.token) 
     const postOrder = await orderService.create(order)
      dispatch(setOrder(postOrder))
    } catch(error) {
      dispatch(setOrderWithError(error.response.data.error))
    }
  }
}

export const getOrder = (id) => {
  return async (dispatch, getState) => {
    try {
     dispatch(startLoading())
     const { users } = getState()
     orderService.setToken(users.data.token)
     const order = await orderService.getOrderDetails(id)
     dispatch(setOrder(order))
    } catch(error) {
        dispatch(setOrderWithError(error.response.data.error))
    }
  }
}

export const getOrdersfromUser = () => {
  return async dispatch => {
    const order = await orderService.getUserOrders()
    dispatch(setOrder(order))
  }
}

export const { setOrderWithError, setOrder, startLoading } = orderSlice.actions

export default orderSlice.reducer