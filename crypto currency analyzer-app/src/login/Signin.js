import { Box, TextField } from '@material-ui/core'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, {  useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../firebase.js/Config'
import { setAlert } from '../redux/slice/Api'

export default function Signin({handleClose}) {
    const[signin,setSignin]=useState({
      email:"",
      password:""
    })
    const dispatch=useDispatch()
    const {email,password}=signin
    const handleSubmit =async()=>{ 
        try{
            const result=await signInWithEmailAndPassword(auth,email,password)
            dispatch(setAlert({open:true,message:"Successfully Logged In",type:'success'}))
            handleClose()
        }
        catch(error){
          dispatch(setAlert({open:true,message:"'Invalid Username or Password'",type:'success'}))
        }
    }
  return (
    <Box
    p={3}
    style={{ display:'block',flexDirection:'coloumn' , gap:'20px'}} className='text-white'>
        <TextField variant='outlined' className='m-2 ' label='Enter Email'type='email' value={email} fullWidth onChange={(e)=>setSignin({...signin,email:e.target.value})}  />
        <TextField variant='outlined' className='m-2' label='Enter Password'type='password' value={password} fullWidth onChange={(e)=>setSignin({...signin,password:e.target.value})}/>
        <button className='btn btn-block btn-primary col-12 btn-lg text-white' onClick={handleSubmit}>
        Sign In
      </button>
   </Box> 
  )
}
