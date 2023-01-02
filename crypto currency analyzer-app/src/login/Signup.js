import { Box, TextField } from '@material-ui/core'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../firebase.js/Config'
import { setAlert } from '../redux/slice/Api'

export default function Signup({handleClose}) {
    const[signup,setSignup]=useState({
      email:'',
      password:'',
      confirm:'',
    })
    const {email,password,confirm}=signup
    const dispatch=useDispatch()
    const handleSubmit =async()=>{
        try{
        if(password!==confirm){
          dispatch(setAlert({open:true,message:"Password Doesn't Match With Confirm Password",type:'warning'}))
        }
        else{const result=await createUserWithEmailAndPassword(auth,email,password)
        console.log(result)
        dispatch(setAlert({open:true,message:"Sign Up Successfull",type:'success'}))
        handleClose()
        }}
        catch(error){
          dispatch(setAlert({open:true,message:"Sign-Up Failed",type:'error'}))
        }
    }
  return (
   <Box p={3} style={{ display:'block',flexDirection:'coloumn' , gap:'20px'}}>
        <TextField variant='outlined' className='m-2 ' label='Enter Email'type='email' value={email} fullWidth onChange={(e)=>setSignup({...signup,email:e.target.value})}/>
        <TextField variant='outlined' className='m-2' label='Enter Password'type='password' value={password} fullWidth onChange={(e)=>setSignup({...signup,password:e.target.value})}/>
        <TextField variant='outlined'className='m-2'  label='Confirm Password'type='password' value={confirm} fullWidth onChange={(e)=>setSignup({...signup,confirm:e.target.value})}/>
        <button className='btn btn-block btn-warning col-12 btn-lg text-white' onClick={handleSubmit}>Sign Up</button>
   </Box>
  )
}
