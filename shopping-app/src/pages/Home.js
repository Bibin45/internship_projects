import Header from "../components/Header"
import React from "react"
import {Link} from 'react-router-dom'
import { useSelector} from 'react-redux'
import Footer from "../components/Footer"
import axios from "axios"
export default function Home(){
    const myproduct=useSelector((state)=>state.product.product)
    // const Api=async(product)=>{
    //     let data=await axios.post('http://localhost:15000/createproduct',JSON.stringify(product))
    // }
return(
    <>
    {/* {myproduct.map((product,index)=>{
        Api(product)
    })} */}
    <Header/>
        <div className="container font">
            {myproduct&&myproduct.map((item,index)=>{
                return(
                    <div key={index} className="col-4 inline text-secondary text-center pics mt-2">
                        <div >
                            <Link to={`/view/${item.brand}`}><p><img src={item.image} className='imgsize1'/></p></Link>
                            <h5>{item.brand}</h5>
                            <h6>{item.price}</h6>
                        </div>
                    </div>
                )
            })}
        </div>
        
    <Footer/>
    </>)
}