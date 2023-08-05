import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from './components/Admin/Admin'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import { setAuthToken } from './services/setAuthToken'
import NotFound from './components/NotFound/NotFound'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { useSelector } from 'react-redux'
import Product from './components/Products/Product'
import ForgotPassword from './components/Login/ForgotPassword'
import ResetPassword from './components/Login/ResetPassword'
import Cart from './components/Cart/Cart'
import { ToastContainer } from 'react-toast'
import Shipping from './components/Cart/Shipping'
import ConfirmOrder from './components/Cart/ConfirmOrder'
import { getApiKey } from './services/stripe'
import { Elements } from '@stripe/react-stripe-js'
import Payment from './components/Cart/Payment'
import { loadStripe } from '@stripe/stripe-js'

import { Toaster } from 'react-hot-toast'

const App = () => {
  const { user } = useSelector(state => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stripeApiKey, setStripeApiKey] = useState();
  
  useEffect(() => {
    if(localStorage.token){
      setAuthToken(localStorage.token)
      setIsAuthenticated(true)
    }
    getApiKey(setStripeApiKey)
  }, [user])
  
  return (
    <>
      <Router >
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <ToastContainer delay={3000} position='top-center' />
        <Routes>
          {stripeApiKey && 
            <Route path='/process/payment' element={
              <ProtectedRoute user={user}>
                <Elements stripe={loadStripe(stripeApiKey)} >
                  <Payment />
                </Elements>
              </ProtectedRoute>
            } />
           }

          <Route path='/' exact element={<Home />}  />
          <Route path='/login' element={ <Login />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/password/reset/:token' element={<ResetPassword />} />

          <Route path='/profile' element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shipping' element={
            <ProtectedRoute user={user}>
              <Shipping />
            </ProtectedRoute>
          } />

          <Route path='/order/confirm' element={
            <ProtectedRoute user={user}>
              <ConfirmOrder />
            </ProtectedRoute>
          } />

          <Route path='/admin/*' element={
            <ProtectedRoute user={user} isAdmin={true}>
              <Admin />
            </ProtectedRoute>
          } />

          <Route element={window.location.pathname === '/process/payment' ? null : <NotFound /> }  />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster position='top-center'  />
      </Router>
    </>
  )
}

export default App