import React, { useState } from 'react'
import Navbar from "./components/navbar/navbar"
import {Route, Routes, useLocation} from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Placeorder from './pages/placeorder/placeorder'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUP/LoginPopUp'
import Verify from './pages/verify/Verify'
import Myorders from './pages/myorders/Myorders'
import BottomNav from './components/BottomNav/BottomNav'
import Search from './pages/search/Search'
import Profile from './pages/profile/Profile'
import CartFooter from './components/CartFooter/CartFooter'


const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [menu, setMenu] = useState("home")
  const location = useLocation()

  const hideHeaderFooter = ['/search', '/profile', '/cart', '/myorders']
  const showCartFooter = ['/cart', '/myorders']
  return (
    <>
      {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>: <></>}

    <div className='app'>
            {!hideHeaderFooter.includes(location.pathname) && (
          <Navbar setShowLogin={setShowLogin} menu={menu} setMenu={setMenu} />
        )}
      <Routes>
        <Route path='/' element={<Home setShowLogin={setShowLogin}/>} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Placeorder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<Myorders/>}/>
        <Route path='/search' element={<Search setShowLogin={setShowLogin}/>}/>
        <Route path='/profile' element={<Profile setShowLogin={setShowLogin}/>}/>
      </Routes>
      {/* <BottomNav setShowLogin={setShowLogin}/> */}
    </div>
    {!hideHeaderFooter.includes(location.pathname) && (
        <Footer menu={menu} setMenu={setMenu} />
      )}

      {showCartFooter.includes(location.pathname) &&(
        <CartFooter/>
      )
      }

    </>
  )
}

export default App