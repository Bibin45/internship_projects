import { LinearProgress} from '@material-ui/core'
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Coininfo from '../components/Coininfo'
import { setAlert, SingleCoin } from '../redux/slice/Api'
import ReactHtmlParser from 'react-html-parser'
import { numberWithCommas } from '../components/Carousel'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '../firebase.js/Config'
export default function Coin() {
  const par=useParams()
  const dispatch=useDispatch()
  const {eachcoin,watchlist}=useSelector((state)=>state.api)
  const{currency,symbol,user}=useSelector((state)=>state.bitcoin)
  useEffect(()=>{
    dispatch(SingleCoin(par.id))
  },[currency])
  const inwatch=watchlist?.includes(eachcoin.id)
  //add wishlist  
  const addWatch=async()=>{
    const watch=doc(firestore,'watchlist',user.uid)
    console.log(eachcoin)
    try{
        await setDoc(watch,{
          coins:watchlist?[...watchlist,eachcoin.id]:[eachcoin.id]
        }) 
        dispatch(setAlert({open:true,message:"Added To Whishlist",type:'info'}))
    }
    catch(error){
      dispatch(setAlert({open:true,message:"Failed To Add",type:'error'}))
      
    }
  }
  //remove wishlist
    const removeWatch = async () => {
    const watch = doc(firestore, "watchlist", user.uid);
    try {
      await setDoc(
        watch,
        { coins: watchlist.filter((coin) => coin !== eachcoin?.id) },
        { merge: 'true' }
      );
      dispatch(setAlert({open:true,message:`${eachcoin.name}Removed From Wishlist`,type:'info'}))
      

    } catch (error) {
      
      dispatch(setAlert({open:true,message:`${eachcoin.name}Failed To Remove`,type:'error'}))
    }
  };

  if (!eachcoin) return <LinearProgress style={{backgroundColor:'gold'}}/>
  return (
    <div className='bg-dark text-white container-fluid ' >
    <div className='row w-100 height text-center  mb-5 '>
      <div className='col-sm-12 col-lg-5 mt-3 mb-5 '>
        {eachcoin&&
          <div className='sidebar p-2 pb-0'>
          <img src={eachcoin.image.large} alt={eachcoin.name} height='200' style={{marginBottom:20}}/>
          <h3 className='font'>{eachcoin.name}</h3>
          <p className='description'>{ReactHtmlParser(eachcoin.description.en.split(". ")[0])}</p>
          <div>
            <h5 className='font'>Rank : {eachcoin.market_cap_rank}</h5>
            <h5 className='font'>Current Price : {symbol}{" "}{numberWithCommas(eachcoin.market_data.current_price[currency.toLowerCase()])}</h5>
            <h5 className='font'>Market Cap : {symbol}{" "}{numberWithCommas(eachcoin.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}</h5>
          </div>
          {user?(<button style={{fontFamily:'Montserrat'}} className={!inwatch?('btn col-12  btn-lg bg-gold mt-3 text-white'):('btn col-12  btn-lg bg-red mt-3 text-white')} onClick={!inwatch?addWatch:removeWatch}>{inwatch?('Remove From Watchlist'):('Add To WishList')}</button>):(null)}

        </div>}
      </div>
      <div className='  mt-5 col-sm-12 col-lg-7 mb-5'>
        <Coininfo />
      </div>
      
    </div>
    </div>
  )
}
