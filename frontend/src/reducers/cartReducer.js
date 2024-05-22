import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')): 
    [],
    shippingAddress: localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) :
    {}
  },
  reducers: {
    addItem: (state, action) => {
      const cartItemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)
        cartItemIndex >= 0 ? 
        state.cartItems[cartItemIndex].qty = state.cartItems[cartItemIndex].qty + action.payload.qty :
        state.cartItems = [...state.cartItems, action.payload]
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    decreaseItem: (state, action) => {
      const cartItemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)
        cartItemIndex >= 0 ?
        state.cartItems[cartItemIndex].qty = state.cartItems[cartItemIndex].qty - action.payload.qty :
        state.cartItems = [...state.cartItems, action.payload]
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        if(state.cartItems[cartItemIndex].qty === 0) {
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        }    
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress))
    },
    clearItems: (state, action) => {
      state.cartItems = []
    }
    }
})

export const addToCart = (product, qty) => {
  return async dispatch => {
    dispatch(addItem({...product, qty}))     
  }
}

export const decreaseToCart = (product, qty) => {
  return async dispatch => {
    dispatch(decreaseItem({...product, qty}))
  }  
}

export const removeFromCart = (product) => {
  return async dispatch => {
    dispatch(removeItem(product))
  }
}

export const saveAddress = (address) => {
  return async dispatch => {
    dispatch(saveShippingAddress(address))
  }
}

export const clearCart = () => {
  return async dispatch => {
    window.localStorage.removeItem("cartItems")
    dispatch(clearItems())
  }
}

export const { addItem, removeItem, saveShippingAddress, clearItems, decreaseItem } = cartSlice.actions

export default cartSlice.reducer