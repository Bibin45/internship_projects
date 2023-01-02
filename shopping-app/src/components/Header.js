import {useNavigate,Link} from 'react-router-dom'
import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIslog, setLoguser } from '../redux/slice/User'
import { setCart, setProduct } from '../redux/slice/Product'
import axios from 'axios'
export default function Header(){
    let {mycart} =useSelector((state)=>state.product)
    let {loguser,islog}=useSelector((state)=>state.user)
    const dispatch=useDispatch()
    let log=localStorage.getItem('mylog')
    let navigate=useNavigate()
    let name=localStorage.getItem('name')
    useEffect(()=>{
        if(!islog && log===false) navigate('/login/all')
        }  
    )
    useEffect(()=>{
        if(mycart.cart){
            Allproduct()
            Getcart()
        }
    },[])
    useEffect(()=>{
        if(log===true){
            dispatch(setLoguser({...loguser, email:localStorage.getItem('myuser')}))
            dispatch(setIslog(true))
        }
        else if(log==='false'){
            dispatch(setCart({...mycart,cart:[], email:''}))
            localStorage.setItem('myuser','')
        }
    },[loguser])
    const Allproduct=async()=>{
        let {data}=await axios.get('http://localhost:15000/read')
        console.log(data)
        let newdata=JSON.parse(data.myproduct)
        dispatch(setProduct(newdata))
      }
    const Getcart=async()=>{
        let {data}=await axios.post('http://localhost:15000/getcart',JSON.stringify(loguser))
        if(data){
            let newdata=JSON.parse(data.cart)
            console.log(newdata)
            dispatch(setCart({...mycart,cart:newdata,email:loguser?.email}))
        }
      }
    const Logout=()=>{
        dispatch(setIslog(false))
        localStorage.setItem('mylog',false)
        localStorage.setItem('name',JSON.stringify(''))
        localStorage.setItem('myuser',JSON.stringify(''))
        localStorage.setItem('cart',JSON.stringify([]))
        dispatch(setLoguser(''))
        navigate('/login/all')  
    }
    return(
        <>
         <nav className="navbar container navbar-expand-lg navbar-light font d-flex justify-content-around bg-primary header sticky-top border rounded">
         <Link to={'/'}> <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"/></Link>
            <form className="form-inline ">
                <input className="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search"/>
              </form>
              
          
            
              <Link to={'/cart'}>  <button className="btn btn-primary font-weight-bold "><img className="imgsize" alt="cart" src='https://cdn-icons-png.flaticon.com/512/3502/3502601.png'/><br/>Cart</button></Link>
             {islog===true&&<Link to={'/myorders'}>  <button className="btn btn-primary font-weight-bold "><img className="imgsize" alt="myorders" src='https://cdn-icons-png.flaticon.com/128/1559/1559859.png'/><br/>Myorders</button></Link>}

            {!islog?( <button className="btn btn-light btn-lg text-primary " onClick={Logout} >Login</button>):( <button className="btn btn-light btn-lg text-primary " onClick={Logout} >Logout - {name}</button>)}    
    </nav>
        </>
    )
}