import React, { useEffect, useState } from 'react'
import './Home.css'
import HomeNavbar from '../../components/navbar/Navbar'
import { Footer } from '../../components/footer/Footer'
import Login from '../../components/login/Login'
import { Route, Routes } from 'react-router-dom'
import HomeContainer from '../../components/home/HomeContainer'
import Products from '../productPage/Products'
import Profile from '../profilePage/Profile'
import MensDropdown from '../../components/dropdowns/MensDropdown'
import WomensDropdown from '../../components/dropdowns/WomensDropdown'
import KidsDropdown from '../../components/dropdowns/KidsDropdown'
import Cart from '../cartPage/Cart'
import WishList from '../wishlistPage/WishList'
import { setAuthToken } from '../../services/setAuthToken'
import { viewProfile } from '../../services/auth.services'
import { useDispatch } from 'react-redux'

export const Home = () => {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.token){
      setAuthToken(localStorage.token)
      dispatch(viewProfile(JSON.parse(localStorage.user)))
      setIsLoggedIn(true);
      setShowLogin(false)
    }
  })


  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);
  const [showKidsDropdown, setShowKidsDropdown] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  }

  const toggleMenDropdown = () => {
    setShowMenDropdown(!showMenDropdown);
    setShowWomenDropdown(false);
    setShowKidsDropdown(false)
  }

  const toggleWomenDropdown = () => {
    setShowWomenDropdown(!showWomenDropdown);
    setShowMenDropdown(false)
    setShowKidsDropdown(false)
  }

  const toggleKidsDropdown = () => {
    setShowKidsDropdown(!showKidsDropdown);
    setShowMenDropdown(false)
    setShowWomenDropdown(false)
  }

  return (
    <>
      <div style={{ position: "relative"}}>
        {showLogin && <Login toggleLogin={toggleLogin} setIsLoggedIn={setIsLoggedIn} />}

        {showMenDropdown && <MensDropdown toggleMenDropdown={toggleMenDropdown} />}
        {showWomenDropdown && <WomensDropdown toggleWomenDropdown={toggleWomenDropdown} />}
        {showKidsDropdown && <KidsDropdown toggleKidsDropdown={toggleKidsDropdown} />}

        <HomeNavbar 
          toggleLogin={toggleLogin} 
          loggedIn={loggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
          toggleMenDropdown={toggleMenDropdown} 
          toggleWomenDropdown={toggleWomenDropdown} 
          toggleKidsDropdown={toggleKidsDropdown} 
        />

        <Routes>
          <Route path='/' element={<HomeContainer />} />
          <Route path='/products' element={<Products />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/wishlist' element={<WishList />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        
        <Footer />
      </div>
    </>
  )
}
