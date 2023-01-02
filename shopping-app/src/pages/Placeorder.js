import { useParams,useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { useSelector, useDispatch } from 'react-redux'
import Footer from "../components/Footer";
export default function Placeorder(){
    let islog=useSelector((state)=>state.user.islog)
    let buynow=[JSON.parse(localStorage.getItem('buy'))]
    let cartitem=useSelector((state)=>state.product.mycart.cart)
    const par=useParams()
    const navigate=useNavigate()
    //buynow 
    if(par.brand==='frombuy'){ 
    return(
        <>
        <Header/>
        {buynow&&buynow.map((item,index)=>{
            return(<div key={index}>
            <div className="container text-center font">
                <div className="row">
                    <div className="col-7 mt-5 ">
                        <h4>{item.name}</h4>
                        <img src={item.image} className='imgsize1'/>
                        <h5>{item.price}</h5>
                    </div>
                    <div className="col  position-relative">
                        <p className="position">{item.description}</p>
                    </div>
                </div>
                <h6 className="align text-secondary">Gst for the product is 18% : ₹{item.rate*.18}</h6>
                <h6 className="align text-secondary">Delivery Charge for the product is : ₹40</h6>
                <h6 className="align text-secondary">Total taxable value for the product is : ₹{item.rate+40}</h6>
                <button onClick={()=>{islog===true?(navigate('/payment/frombuy')):alert('Please Login First')(navigate('/login/placeorderbuy'))}} className='btn btn-primary col-12 mt-3 mb-5'><h6>Proceed to Payment<br/><br/>Total Value  - {item.rate+40}</h6></button>
            </div>
            </div>)})}
            <Footer/>
        </>
    )}
    //cart item for placeorder
    if(par.brand==='fromcart'){ 
        let k=0;
        return(
            <>
            <Header/>
            {cartitem&&cartitem.map((item,index)=>{
                k=k+item.rate+40
                return(<div key={index}>
                <div className="container text-center font">
                <div className="row">
            <div className="col-7">
                <h4>{item.name}</h4>
                <img src={item.image} className='imgsize1'/>
                <h5>{item.price}</h5>
            </div>
            <div className="col position-relative">
                <p className="position">{item.description}</p>
            </div>
            </div>
                <h6 className="align text-secondary">Gst for the product is 18% : ₹{item.rate*.18}</h6>
                <h6 className="align text-secondary">Delivery Charge for the product is : ₹40</h6>
                <h6 className="align text-secondary">Total taxable value for the product is : ₹{item.rate+40}</h6>
                </div>
                </div>)
            })}
            <div className="text-center container mt-3 mb-5 font">  
           <button className="btn btn-primary col-12" onClick={()=>{islog===true?(navigate('/payment/fromcart')):alert('Please Login First')(navigate('/login/placeordercart'))}}><h6>Proceed to Payment<br/><br/>Total Value  - {k}</h6></button>
            </div>
            <Footer/>
            </>
        )}
}
