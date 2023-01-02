import { makeStyles } from '@material-ui/core'
import { tab } from '@testing-library/user-event/dist/tab'
import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
export default function Carousel() {
    const symbol=useSelector((state)=>state.bitcoin.symbol)
    
    const useStyles=makeStyles(()=>({
        carousal:{
            height:'50%',
            display:'flex',
            alignItems:'center', 
            color:'white',
        }
    }))
    const trending=useSelector((state)=>state.api.trending)
    const items=trending&&trending.map((coin)=>{
        let profit=coin.price_change_percentage_24h>=0;
        return(
            <Link to={`/coin/${coin.id}`} className='font'>
                <img src={coin?.image} height='80' alt={coin.name} style={{marginBottom:10}}/>
                <p className='span cap'>{coin.symbol}
                    <span style={{color: profit > 0 ? 'green':'red'}}>{profit && '+'}{coin.price_change_percentage_24h.toFixed(2)}%</span><br/>
                    <span >{symbol}{numberWithCommas(coin.current_price.toFixed(2))}</span>
                </p>
            </Link>
        )
    }) 
    const classes=useStyles()
    const resp={
        0:{
            items:2,
        },
        512:{
            items:4
        }
    }

  return (
    <div className={classes.carousal}>
      <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={500}
      animationDuration={1000}
      disableButtonsControls
      disableDotsControls
      responsive={resp}
      autoPlay
      items={items}
      />
    </div>
  )
}
