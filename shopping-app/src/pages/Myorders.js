import { useState } from "react";
import Header from "../components/Header";

export default function Myorder(){
    const[myorder,setMyoder]=useState(JSON.parse(localStorage.getItem('myorder')))

    const Cancel=(index)=>{
        let newitem=myorder.filter((item,i)=>index!==i)
        localStorage.setItem('myorder',JSON.stringify(newitem))
        setMyoder(newitem)
    }
return(
    <div>
        <Header/>
        <div className="container">
        {myorder&&myorder.map((item,index)=>{
            return(
                <div key={index} className='card text-center inline p-3 m-2 font '>
                        <h5>{item.name}</h5>
                        <div className="row">
                        <div className="col-4">
                            <img src={item.image} className='imgsize1'/>
                            </div>
                                <div className="col align"><p>{item.description}</p>
                            </div>
                        </div>
                        <p>{item.price}</p>
                        <h6 className="text-primary">Will Be Delivered in 6 Days</h6>
                        <button className="btn btn-danger" onClick={()=>Cancel(index)}>Cancel Item</button>
                    
                </div>
            )
        })}
        </div>
        <div className="container font">
    
   {!myorder.length&&<div className="text-center mt-3"><img className="imgsize1" src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" /><h4 className="text-center text-primary mt-5">No Orders</h4></div>}
</div>
    </div>
)
}