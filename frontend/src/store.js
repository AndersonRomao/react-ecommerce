import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducers/usersReducer'
import categoriesReducer from './reducers/categoriesReducer'
import productsReducer from './reducers/productsReducer'
import cartReducer from './reducers/cartReducer'
import orderReducer from './reducers/orderReducer'

const store = configureStore({
    reducer: {
        users: usersReducer,
        categories: categoriesReducer,
        products: productsReducer,
        cart: cartReducer,
        order: orderReducer
    }
})

export default store
