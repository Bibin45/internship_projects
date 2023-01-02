import { useParams , Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { setCart } from "../redux/slice/Product";
import { useEffect } from "react";
export  default function View(){
    const {product,mycart}=useSelector((state)=>state.product)
    let {loguser,islog}=useSelector((state)=>state.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    let par=useParams();
    if(!localStorage.getItem('cart')){
        localStorage.setItem("cart",JSON.stringify([]))
    } 
    if(!localStorage.getItem('buy')){
        localStorage.setItem("buy",JSON.stringify([]))
    }
    //adding cart item
    useEffect(()=>{cartitem()})
    const Cart=()=>{
         product.map((item,index)=>{
             if (par.brand===item.brand){
                dispatch(setCart({...mycart,cart:[...mycart.cart,item],email:loguser?.email}))  
            }
        })
    }
    const cartitem=async()=>{
        
        let data=await axios.post('http://localhost:15000/cart',JSON.stringify(mycart))
        console.log(mycart)
        console.log(data)
    }
    
    
       //buy item
       const Buy=()=>{
        product.map((item,index)=>{
             if (par.brand===item.brand){
                localStorage.setItem('buy',JSON.stringify(item))
                }
            })
       }
    return(
        <>
        <Header/>
         {product&&product.map((item,index)=>{
           if(par.brand===item.brand){
                return(
                    <div key={index}  className='container text-center font '>
                        <div className="row">
                        <div className="col-7">
                            <p>{item.name}</p>
                            <img src={item.image} className='imgsize1'/>
                            <p>{item.price}</p>
                            <button className="btn btn-warning btn-lg text-white col-12 mt-2 mb-2" onClick={()=>{islog===true?(Cart()):alert('Please Login First')(navigate('/login/placeordercart'))}}>Add To Cart</button>
                            <Link to={`/placeorder/frombuy`}><button className="btn btn-primary btn-lg col-12" onClick={Buy}>Buy Now</button></Link>
                        </div>
                        <div className="col position-relative">
                        <h6 className="position">{item.description}</h6>
                        </div>
                     </div>
                    </div>
                )}
         })}
        <Footer/>  
        </>
        )}