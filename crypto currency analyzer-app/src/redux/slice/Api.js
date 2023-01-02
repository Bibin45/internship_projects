import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState={
 trending:[],
 coin:[],
 loading:false,
 eachcoin:'',
 chart:[],
 flag:false,
 watchlist:[],
 alert:{
  open:false,
  message:'',
  type:'success',
 },
}
export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
  setTrending:(state,action)=>{
    state.trending=action.payload
  },
  setCoin:(state,action)=>{
    state.coin=action.payload
  },
  setLoading:(state,action)=>{
    state.loading=action.payload
  },
  setEachcoin:(state,action)=>{
    state.eachcoin=action.payload
  },
  setChart:(state,action)=>{
    state.chart=action.payload
  },
  setFlag:(state,action)=>{
    state.flag=action.payload
  },
  setWatchlist:(state,action)=>{
    state.watchlist=action.payload
    console.log(state.watchlist)
  }, 
  setAlert:(state,action)=>{
    state.alert=action.payload
    console.log(state.alert)
  },

  },
})

export const CoinList = (currency)=>async(dispatch)=>{
    dispatch(setLoading(true))
    const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    dispatch(setCoin(data))
    dispatch(setLoading(false))
}
export const SingleCoin = (id)=>async(dispatch)=>{
  const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
  dispatch(setEachcoin(data))
}
export const HistoricalChart = (id, days, currency) =>async(dispatch)=>{
  const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
  dispatch(setFlag(true))
  dispatch(setChart(data.prices))
  
}

export const TrendingCoins = (currency)=>async(dispatch)=>{
    const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
    dispatch(setTrending(data))
}
export const { setTrending,setCoin,setLoading,setEachcoin,setChart,setFlag,setWatchlist,setAlert} = apiSlice.actions
export default apiSlice.reducer