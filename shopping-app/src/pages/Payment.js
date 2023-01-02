import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { setMyorders } from "../redux/slice/Product";
export default function Payment (){
const cart=useSelector((state)=>(state.product.cart))
let buynow=[JSON.parse(localStorage.getItem('buy'))]
let cartitem=useSelector((state)=>state.product.mycart.cart)
let orderitem=useSelector((state)=>state.product.myorders.order)
let k=0;
let par=useParams()
let navigate=useNavigate()
const dispatch=useDispatch()
    const Submit=()=>{

      alert('Your Order Has Been Placed')
      let myorderitem=[...cartitem,...buynow]
      let k=[...myorderitem]
      dispatch(setMyorders())
      localStorage.setItem('myorder',JSON.stringify(k))
      navigate('/')
      localStorage.setItem('cart',JSON.stringify([]))
   }
    return(
    <div className="container font">
        {(par.brand==='frombuy')?(<> <Header/>
        {buynow&&buynow.map((item,index)=>{
            k=k+item.rate+40
            return(<div key={index}>
            <div className="container text-center">
            <h4>{item.name}</h4>
            <img src={item.image} className='imgsize1'/>
            <p>{item.price}</p>
            <p>{item.description}</p>
            <h6 className="align text-secondary">Gst for the product is 18% : ₹{item.rate*.18}</h6>
            <h6 className="align text-secondary">Delivery Charge for the product is : ₹40</h6>
            <h6 className="align text-secondary">Total taxable value for the product is : ₹{item.rate+40}</h6>
            </div>
            </div>)
        })}
        </>):(<>
        <Header/>
        {cartitem&&cartitem.map((item,index)=>{
            k=k+item.rate+40
            return(<div key={index}>
            
            <div className="container text-center">
            <h4>{item.name}</h4>
            <img src={item.image} className='imgsize1'/>
            <p>{item.price}</p>
            <p>{item.description}</p>
            <h6 className="align text-secondary">Gst for the product is 18% : ₹{item.rate*.18}</h6>
            <h6 className="align text-secondary">Delivery Charge for the product is : ₹40</h6>
            <h6 className="align text-secondary">Total taxable value for the product is : ₹{item.rate+40}</h6>
            </div>
            </div>)
        })}
</>)}
        <form className="was-validated" onSubmit={Submit}> 
          <h2>Fill Up Below Details</h2>
            <div className="mb-3 form-group">
                <label >Phone Number </label>
                <input type="number" className="form-control form-inline"   placeholder="90xxxxxx" required/>
                <div className="invalid-feedback">
                  Please enter a valid mobile number
                </div>
            </div>
            <div className="mb-3 form-group">
                <label >Email </label>
                <input type="email" className="form-control form-inline"  placeholder="you@example.com" required/>
                <div className="invalid-feedback">
                  Please enter a valid email address
                </div>
              </div>
              
      
              <div className="mb-3">
                <label >Address</label>
                <input type="text" className="form-control"  placeholder="1234 Main St" required/>
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>
             
              <div className="mb-3 formsize font-weight-bold">
                <h4>Payment Details</h4><br/>
              <div className="form-check form-group" >
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" required />
                <label className="form-check-label" >
                  Cash on Delivery
                </label><br/><br/>
              </div>
              <div className="form-check form-group">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"  />
                <label className="form-check-label" >
                  UPI</label> <br/> <br/><input type="text"className="input-group border border-success p-2 rounded" placeholder="UPI ID" name="1" /> <br/> <br/>
                
              </div>
              <div className="form-check form-group">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" />
                <label className="form-check-label">
                  Card</label><br/><br/>
                  <input type="number"   className="input-group border border-success p-2 rounded" placeholder="Card Number"/><br/><br/>
                <input type="number"   className="input-group border border-success p-2 rounded" placeholder="CCV" /><br/><br/>
                <input type="number"   className="input-group border border-success p-2 rounded" placeholder="Expiry Date" /><br/>
                
              </div>
            </div>
              <div className="text-center">
                <button className="btn btn-primary col-12 btn-lg mt-5 mb-5" type="submit" > Confirm Order <span> Total Value - ₹ {k}</span><span id="total"></span></button>
              </div>
          </form>
        
      </div>
      
    )
}