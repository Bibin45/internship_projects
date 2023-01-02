import React from 'react'
import Carousel from './Carousel'
export default function Banner() {
  return (
    <div className='bg_img'>
      <div className='banner'>
        <h1 className='tagline'>Crypto Hunter</h1>
        <p className='tagtext'>Get all the info regarding your favourite crypto currency</p>
      </div>
      <Carousel/>
    </div>
  )
}
