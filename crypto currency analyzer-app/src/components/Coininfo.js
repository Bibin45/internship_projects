import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux'
import { HistoricalChart } from '../redux/slice/Api';
import { chartDays } from './Data';
import { setFlag } from '../redux/slice/Api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Coininfo() {
  const {eachcoin,chart,flag}=useSelector((state)=>state.api);
  const {currency}=useSelector((state)=>state.bitcoin);
  const [days,setDays]=useState(1)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(HistoricalChart(eachcoin.id,days,currency))
  },[currency,days])
  return (
    <div className='' >
      {chart.length<1||flag===false?(
        <CircularProgress 
          style={{color:'gold'}}
          size={250}
          thickness={1}
          />
      ):(
        <>
        <Line style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
          data={{
            labels:chart&&chart.map((coin)=>{
              let date=new Date(coin[0])
              let time=
                  date.getHours()>12
                 ? `${date.getHours()-12}:${date.getMinutes()} PM`
                 : `${date.getHours()}:${date.getMinutes()} AM`
                 return days===1?time:date.toLocaleDateString()
            }),
            datasets:[
              {
                data:chart&&chart.map((coin)=>coin[1]),
                label:`Price (Past ${days} Days)  in ${currency}`,
                borderColor:'#EEBC1D'
              },
            ],
          }}
          options={{
            elements:{
              point:{
                radius:1,
              },
            },
          }}
        />
        <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <button className=' btn btn-outline-warning ' 
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    dispatch(setFlag(false));
                    
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </button>
              ))}
            </div>
        </>
      )}
    </div>
  )
}
