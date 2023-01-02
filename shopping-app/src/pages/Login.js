import React,{useState,useEffect} from "react"
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setIslog,setLoguser} from '../redux/slice/User'
export default function Login(){
    let par=useParams()
    let {islog}=useSelector((state)=>state.user)
    
    const dispatch=useDispatch()
    let navigate=useNavigate()
    useEffect(()=>{
        if(islog===true)
        if(par.id==='placeorderbuy'){
            navigate('/placeorder/frombuy')
         }
         else if(par.id==='placeordercart'){
            navigate('/placeorder/fromcart')
         }
         else{navigate('/')}
        }, [islog]
    )
    const[logdata,setLogdata]=useState({
        email:'',
        password:''
    })
    const Check=async()=>{          //validating
        const {data} = await axios.post('http://localhost:15000/login',JSON.stringify(logdata))
            if (data){
                dispatch(setLoguser(data))
                localStorage.setItem('myuser',data.email)
                localStorage.setItem('name',data.name)
                localStorage.setItem('mylog',true)
                dispatch(setIslog(true))
                       
            }
            else{
                dispatch(setIslog(false))
                alert("Invalid Email or Password")}
            }
return(
    <form className="formsize text-center ml-auto mr-auto mt-3  was-validated">
        <div className="container width justify-content-center font card p-3">   
            <div className="mt-2 text-center ">
                <Link to={'/'}><img className="mb-4 d-" src="https://seeklogo.com/images/F/flipkart-logo-3F33927DAA-seeklogo.com.png" alt="" width="72" height="72"/></Link> 
                <h1 className="h3 mb-3 font-weight-bold text-primary">Welcome To Flipkart</h1>
                <input type="email" id="mail" className="form-control mt-5"  onChange={(e)=>setLogdata({...logdata,email:e.target.value})}placeholder="Email address" required />
                <input type="password" id="pw" className="form-control mt-2" onChange={(e)=>setLogdata({...logdata,password:e.target.value})} placeholder="Password" required/>
            <div className="checkbox mb-3">
            <label className="mt-3">
                <input type="checkbox" value="remember-me" /> Remember Me
            </label>
            </div>  
                <button className="btn btn-primary   col-12 mt-3" type="button" onClick={()=>Check()} >Login</button>
                <button className="btn btn-warning  col-12 mt-3 text-white" onClick={()=>navigate('/register')}>New User ?</button>   
            </div>
        </div>
    </form>
    )}
