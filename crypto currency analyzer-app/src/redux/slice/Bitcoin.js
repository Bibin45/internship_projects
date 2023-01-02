import { createSlice } from '@reduxjs/toolkit'
const initialState={
 currency:'INR',
 symbol:'₹',
 user:'',
}
export const bitcoinSlice = createSlice({
  name: 'bitcoin',
  initialState,
  reducers: {
   setCurrency:(state,action)=>{
    state.currency=action.payload
   },
   setSymbol:(state,action)=>{
    state.symbol=action.payload
   },
   setUser:(state,action)=>{
    state.user=action.payload
    console.log(state.user)
   },
  },
})
export const {setCurrency,setSymbol,setUser} = bitcoinSlice.actions
export default bitcoinSlice.reducer