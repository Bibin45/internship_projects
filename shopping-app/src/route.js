import React from 'react'
import {BrowserRouter as Router,Routes,Route}from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import View from './pages/View'
import Cart from './pages/Cart'
import Placeorder from './pages/Placeorder'
import Payment from './pages/Payment'
import Myorder from './pages/Myorders'
function Mainroutes(){
    return(
            <Router>
                <Routes>
                    <Route path='/' exact element={<Home/>}/>
                    <Route path='/login/:id' exact element={<Login/>}/>
                    <Route path='/register' exact element={<Register/>}/>
                    <Route path='/view/:brand' exact element={<View/>}/>
                    <Route path='/cart' exact element={<Cart/>}/>
                    <Route path='/placeorder/:brand' exact element={<Placeorder/>}/>
                    <Route path='/payment/:brand' exact element={<Payment/>}/>
                    <Route path='/myorders' exact element={<Myorder/>}/>
                </Routes>
            </Router>
    )
}


export default Mainroutes