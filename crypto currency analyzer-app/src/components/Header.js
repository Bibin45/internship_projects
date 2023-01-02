import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency,setSymbol, setUser } from '../redux/slice/Bitcoin';
import {  TrendingCoins } from '../redux/slice/Api';
import Login from '../login/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, } from '../firebase.js/Config';
import { CoinList } from '../redux/slice/Api'
import UserSidebar from '../login/SideBar';
import { firestore } from '../firebase.js/Config'
import { setWatchlist } from '../redux/slice/Api'
import { doc, onSnapshot } from 'firebase/firestore'
export default function Header() {
 const dispatch = useDispatch()
 const {currency,user}=useSelector((state)=>state.bitcoin)
  useEffect(()=>{
    if(currency==='USD')dispatch(setSymbol('$'))
    else if(currency==='INR')dispatch(setSymbol('₹'))
    dispatch(TrendingCoins(currency))
    },[currency]);
    //authentication check and storing user details
    useEffect(()=>{
      onAuthStateChanged(auth,user=>{
        if(user)dispatch(setUser(user))
        else dispatch(setUser(''))
      })
    })
    //setting all coins
    useEffect(()=>{
      dispatch(CoinList(currency))
  },[currency])
    
      //getting wishlist
useEffect(()=>{
  if(user.length>0){
    const watch= doc(firestore,'watchlist',user?.uid);
    var unsubscribe=onSnapshot(watch,(coin)=>{
      if(coin.exists()){
        dispatch(setWatchlist(coin.data().coins))
      }
      else{
        console.log('No Items in Wishlist')
      }
    })
    return()=>{
      unsubscribe()
    }
  }
},[user])
  return (
    <nav color='inherit' position='static' className='navbar d-block  nav bg-expand ' style={{background:'#16171a' ,color:'goldenrod'}}>
      <div className='d-flex mt-2 container ' style={{height:'60px'}}>
          <a href={'/'} className='font col-9'>  <h3 > CRYPTO HUNTER</h3></a>
      <div className='col d-flex'>
          <select className="form-select font size " value={currency} onChange={(e)=>dispatch(setCurrency(e.target.value))}>
            <option  value="USD">USD</option>
            <option value="INR">INR</option>
          </select> 
          {user?(<UserSidebar/>):(<Login/>)}
      </div>
      </div>
    </nav> 
  )
}
