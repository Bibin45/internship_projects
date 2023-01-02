import UserContext from "../store"
import React,{useState,useEffect} from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {setIslog,setLoguser} from '../redux/slice/User'

function Login(){
   
const islog=useSelector((state) => state.user.islog)
const user=useSelector((state) => state.user.user)
   console.log(islog)
    let dispatch=useDispatch()
    let navigate=useNavigate()

    useEffect(()=>{
        if(islog==true)
        navigate('/form')
    }, [islog]
        
    )


    const[logdata,setLogdata]=useState({
        request:'candidate_login',
          email:'',
          password:''
    })
    const Check=async()=>{
      
        
        const {data} = await axios.post('http://karka.academy/api/action.php',JSON.stringify(logdata))
        // console.log(data)
            dispatch(setLoguser(data.data))
                // value.setLoguser(data.data)
                
                
                
            
            if (data.status==='success'){
                dispatch(setIslog())
                // setIslog(true) 
                
                localStorage.setItem('mylog',true)
                // navigate('/form')
                    
            }
            else{
                // setIslog(false)
                
            alert("Invalid Email or Password")}
    
    }

    return(
        <div className="container  font">
            <h2 className="text-secondary text-center mt-3">Welcome To Resume Builder</h2>
        <div className="width mt-5">
            
            <input type ='email' className="form-control mt-3" onChange={(e)=>setLogdata({...logdata,email:e.target.value})} placeholder=" Enter Your Email" required/>
            <input type='password' className="form-control mt-3"  onChange={(e)=>setLogdata({...logdata,password:e.target.value})} placeholder="Enter Your Password" required/>
            
            <button className="btn btn-primary btn-lg  col-3 mt-3" type="submit" onClick={()=>Check()} >Login</button>
            <button className="btn btn-warning btn-lg col-4 mt-3 text-white" onClick={()=>navigate('/register')}>New User ?</button>
            
        </div>
        
        </div>
    )
}

export default Login