import {useNavigate} from 'react-router-dom'
import React,{useEffect,useContext} from 'react'
import {setFalse} from '../redux/slice/User'
import {useSelector,useDispatch} from 'react-redux'

function Header(){
    
    const islog=useSelector((state) => state.user.islog)
    const dispatch=useDispatch()
    let log=localStorage.getItem('mylog')
    let navigate=useNavigate()
    useEffect(()=>{
        if(!islog && log=='false') navigate('/')
        },
        
    )
    const Logout=()=>{
        // value.setIslog(false)
    dispatch(setFalse())
        localStorage.setItem('mylog',false)
        
        localStorage.setItem('name',null)

        console.log(islog)
        navigate('/')
       
    }

    return(<>
<div className="container font ">
<nav className="navbar navbar-expand-lg navbar-dark text-white p-3 d-flex justify-content-around border rounded bg-secondary">
  
  
    <h4 className="nav-item mt-3 text-center text-warning col mb-3">Build Your Resume</h4>
    <h4 className='align1'><button type='button' className="btn btn-outline-warning  text-white font " onClick={Logout}>Logout</button></h4>
      
    
    
</nav>
</div>

</>
    )
}

export default Header