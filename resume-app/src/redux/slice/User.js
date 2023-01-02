import { createSlice } from '@reduxjs/toolkit'



const initialState={
  islog:false,
  user:'',
  alluser:[],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIslog: (state) => {
        state.islog = true
        // console.log(state.islog)
      },
      setFalse: (state) => {
        state.islog = false
        // console.log(state.islog)
      },
      setLoguser: (state,action) => {
        state.user = action.payload
        // console.log(state.user)
      },
      setAlluser: (state,action) => {
        state.alluser = action.payload
        console.log(state.alluser)
      },
  },
})


export const { setIslog,setFalse,setLoguser,setAlluser } = userSlice.actions

export default userSlice.reducer