import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Coin from './pages/Coin'
import Header from './components/Header'
import Alert from './components/Alert'
export default function Mainroute() { 
  return (
    <>
        <Header/>
        <Alert/>
          <Router>
                  <Routes>
                      <Route path='/' exact  element= {<Home/>} />
                      <Route path='/coin/:id' exact element = {<Coin/>} />
                  </Routes>
          </Router>
 
    </>
  )
}
