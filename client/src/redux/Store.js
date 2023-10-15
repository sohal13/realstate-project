import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import useReducer from './user/userSlice.js'

export const Store = configureStore({
  reducer: {user:useReducer},
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware({

  })
})
