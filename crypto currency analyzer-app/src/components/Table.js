import { Container, LinearProgress} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {numberWithCommas} from './Carousel'
export default function Table() {
    const[search,setSearch]=useState('')
    const[page,setPage]=useState(1)
    const {coin,loading}=useSelector((state)=>state.api)
    const symbol=useSelector((state)=>state.bitcoin.symbol)
    const navigate=useNavigate()
   const handleSearch=()=>{
    return coin.filter((coin)=>(
    coin.name.toLowerCase().includes(search)||coin.symbol.toLowerCase().includes(search)
    ));
   };
   let profit=coin.price_change_percentage_24h>=0;
  return (
    <div >
        <Container className='text'>
            <h4  className='type text-white'>
            Crypto Currency Prices By Market Cap 
            </h4>
            <input className='form-control bg-dark marb' style={{color:'white'}} placeholder='Search Crypto Currency Here...'
            onChange={(e)=>setSearch(e.target.value)}/>
            {loading?(
                <LinearProgress style={{backgroundColor:'gold'}}/>
                ):(
                <table className=' table font '>
                    <thead className='bgcolor' >
                        <tr>
                            <th>Coin</th>
                            <th>Price</th>
                            <th>24h Change</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                    {handleSearch()
                    .slice((page-1)*10,(page-1)*10+10)
                    .map((coin)=>{
                        return(
                        <tbody key={coin.name}>
                            <tr className='span hover' onClick={()=>(navigate(`./coin/${coin.id}`))}>
                                <td>
                                    <img src={coin.image} height='50' style={{marginBottom:10}} alt={coin.name}/><br/>
                                    <span>{coin.symbol}</span><br/>
                                    <span style={{fontSize:10 ,color:'darkgrey'}}>{coin.name}</span>
                                </td>
                                <td className='valign'>
                                    <span >{symbol}{numberWithCommas(coin.current_price.toFixed(2))}</span>
                                </td>
                                <td className='valign'>
                                    <span style={{color: profit > 0 ? 'green':'red'}}>{profit && '+'}{coin.price_change_percentage_24h.toFixed(2)}%</span>
                                </td>
                                <td className='valign'>
                                    <span >{symbol}{numberWithCommas(coin.market_cap.toString().slice(0,-6))}</span>
                                </td>
                            </tr>
                        </tbody>
                    )})}
                </table>)}
                <Pagination className='bgcolor '
                style={{
                    padding:20,
                    width:'100%',
                    display:'flex' ,
                    justifyContent:'center',
                    color:'white'
                }}
                count={(handleSearch()?.length/10).toFixed(0)}
                onChange={(_,value)=>{
                    setPage(value);
                    window.scroll(0,450)
                }}
                />
        </Container>
    </div>
  )
}
