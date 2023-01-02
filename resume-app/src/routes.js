import React,{useState} from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
}from 'react-router-dom'
import Login from './pages/Login'
import Form from './pages/Resume_form'
import View from './pages/View_resume'
import Register from './pages/Register'


function Mainroutes(){

 
    
    return(
        
            <Router>
                <Routes>
                    <Route path='/' exact element={<Login/>}/>
                    <Route path='/register' exact element={<Register/>}/>
                    <Route path='/form' element={<Form/>}/>
                    <Route path='/view/:id' element={<View/>}/>  
                </Routes>
            </Router>
        
    )
}


export default Mainroutes