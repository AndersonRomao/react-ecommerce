import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: localStorage.getItem("loggedUser") ? 
    JSON.parse(localStorage.getItem("loggedUser")): 
    [],
    loading: false,
    error: false,
},
  reducers: {
    startLoading: (state, action) => {
      state.loading = true
    },
    dataFetched: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = false
    },
    dataFetchedError: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = true;
    },
    fetchAllUsers: (state, action) => {
      state.loading = false;
      state.error = false;
      state.data.listUsers = action.payload
    },
    userAccount: (state, action) => {
      state.loading = false;
      state.account = action.payload;
    }
}})

export const getUserLogin = (credentials) => {
  return async dispatch => {
    try {
    const user = await userService.login(credentials)
      dispatch(dataFetched(user))
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
    } catch(error) {
       console.log(error.response.data)
       dispatch(dataFetchedError(error.response.data))
    } 
}}

export const logoutUser = () => {
  return async dispatch => {
    dispatch(dataFetched([]))
    window.localStorage.removeItem("loggedUser")
  }
}

export const registerUser = (name, email, password) =>{
  return async dispatch => {
   try {
   const user = await userService.create(name, email, password)
    dispatch(dataFetched(user))
    window.localStorage.setItem("loggedUser", JSON.stringify(user))
   } catch(error) {
      dispatch(dataFetchedError(error.response.data))
    }
  }
}

export const getUserProfile = () => {
  return async (dispatch, getState) => {
   dispatch(startLoading())
   const { users } = getState()
   userService.setToken(users.data.token)
   const user = await userService.getProfile()
   dispatch(dataFetched(user))
 }
}

export const getUserAccount = (id) => {
  return async (dispatch, getState) => {
   dispatch(startLoading())
   const { users } = getState()
   userService.setToken(users.data.token)
   const user = await userService.getUser(id)
   dispatch(userAccount(user)) 
 }   
}

export const updateProfile = (name, email, password) => {
  return async (dispatch, getState )=> {
   try {
    const { users } = getState()
      userService.setToken(users.data.token)
      const user = await userService.updateUserAccount(name, email, password)
      console.log(user)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      dispatch(dataFetched(user))
    } catch(error) {
        dispatch(dataFetchedError()) 
    }  
  }
}

export const updateAccount = (id, name, email, isAdmin) => {
  return async (dispatch, getState) => {
    const { users } = getState()
    userService.setToken(users.data.token)
    const user = await userService.updateUser(id, name, email, isAdmin)
    dispatch(userAccount(user))
  }
}

export const deleteUser = (id) => {
  return async (dispatch, getState)=> {
    const { users } = getState()
    userService.setToken(users.data.token)
    const data = await userService.remove(id)
    const allUsers = await userService.usersList()
    dispatch(fetchAllUsers(allUsers))
    console.log(data)
  }
}

export const getAllUsers = () => {
  return async (dispatch, getState) => {
    dispatch(startLoading()) 
    const { users } = getState()
    userService.setToken(users.data.token)
    const allUsers = await userService.usersList()
    dispatch(fetchAllUsers(allUsers)) 
  }
}

export const { dataFetched, userAccount, dataFetchedError, startLoading, removeUser, fetchAllUsers, reset } = userSlice.actions

export default userSlice.reducer