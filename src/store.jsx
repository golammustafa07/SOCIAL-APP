import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/UserSlice/userSlice'

export default configureStore({
  reducer: {
    userLoginInfo : userSlice
  }
})