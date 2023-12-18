import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: localStorage.getItem('userLoginInfo') ? JSON.parse(localStorage.getItem('userLoginInfo')) : null
  },
  reducers: {
    userLoginInfo: (state,action) => {
      console.log(state.userInfo);
      console.log(action.payload);
      state.userInfo = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { userLoginInfo } = userSlice.actions

export default userSlice.reducer