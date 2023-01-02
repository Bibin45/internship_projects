import { createSlice } from '@reduxjs/toolkit'
const initialState={
    product:'',
    mycart:{
      cart:[],
      email:''
    },
    deletecart:{
      cart:[],
      email:''
    },
    myorders:{
      order:[],
      email:''
    }
  

}
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {   
      setProduct:(state,action)=>{
        state.product=action.payload
      },
      setCart:(state,action)=>{
        state.mycart=action.payload
        console.log('mycart',state.mycart)
      },
      setDeletecart:(state,action)=>{
        state.deletecart=action.payload
        console.log('state_delete_cart',state.deletecart)
      },
      setMyorders:(state,action)=>{
        state.myorders=action.payload
        console.log('myorders',state.myorders)
      },
  },
})
export const Deletecart=()=>()=>{

}

export const {setCart,setBuy,setProduct,setDeletecart,setMyorders} = productSlice.actions
export default productSlice.reducer