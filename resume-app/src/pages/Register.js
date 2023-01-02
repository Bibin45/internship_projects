import {useState,useContext} from 'react'
import axios from 'axios'

import {useNavigate} from 'react-router-dom'
function Register(){
      
  let navigate=useNavigate()


const[register,setRegister]=useState({
request:'create_candidate',
name:'',
email:'',
password:'',
aadhar:'',
address:'',
phone:'',
city:'',
area:'',
pin:'',
})


  const Save=async()=>{
        
  const data =  await axios.post('https://karka.academy/api/action.php',JSON.stringify(register))
  console.log(data)
  navigate('/')
  }
  return(
        <>
        <form>
          <div className='container font mt-3  text-secondary'>
            <h2>Registration Form : </h2>
            <div className="row mt-3 mb-3">
              <label className="col-2">Name : </label>
              <input className='form-control col ' onChange={(e)=>setRegister({...register,name:e.target.value})} placeholder="Enter Your Name"/>
            </div>
            <div className="row mt-3 mb-3">
              <label className="col-2">Email : </label>
              <input className='form-control col' onChange={(e)=>setRegister({...register,email:e.target.value})} placeholder="Enter Your Email"/>
            </div>
            <div className="row mt-3 mb-3">
              <label className="col-2">Password : </label>
              <input className='form-control col'  onChange={(e)=>setRegister({...register,password:e.target.value})} placeholder="Enter Your Password"/>
            </div>
            <div className="row mt-3 mb-3">
              <label className="col-2">Aadhar : </label>
              <input className='form-control col'  onChange={(e)=>setRegister({...register,aadhar:e.target.value})} placeholder="Enter Your Aadhar Number"/>
            </div>
            <div className="row mt-3 mb-3">
              <label className="col-2">Address : </label>
              <input className='form-control col' onChange={(e)=>setRegister({...register,address:e.target.value})} placeholder="Enter Your Address"/>
            </div>
            <div className="row mt-3 mb-3">
              <label className="col-2">Phone : </label>
              <input className='form-control col'  onChange={(e)=>setRegister({...register,phone:e.target.value})}placeholder="Enter Your Phone Number"/>
            </div>
            <div className="row mt-3 mb-3">
              <label className="col-2">City : </label>
              <input className='form-control col' onChange={(e)=>setRegister({...register,city:e.target.value})} placeholder="Enter Your City"/>
            </div>
            <div className="row mt-3 mb-3">
              <label className="col-2">Area : </label>
              <input className='form-control col' onChange={(e)=>setRegister({...register,area:e.target.value})} placeholder="Enter Your Area"/>
            </div>
            <div className="row mt-3 mb-3">
              <label className="col-2">Postal Code : </label>
              <input className='form-control col'  onChange={(e)=>setRegister({...register,pin:e.target.value})}placeholder="Enter Your Pin Number"/>
            </div>
            <button className='btn btn-success mt-3 col-12'type='button' onClick={Save}>Submit</button>

          </div>
  
      </form>
    </>
  )
}

export default Register