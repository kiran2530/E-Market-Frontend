import './index.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/common/navbar/Navbar'
import Home from './components/common/home/Home'
import About from './components/common/about/About'
import Shop from './components/buyer/shop/Shop'
import Cart from './components/buyer/cart/Cart'
import Dashboard from './components/vendor/dashboard/Dashboard'
import MyOrders from './components/buyer/myOrders/MyOrders'
import Footer from './components/common/footer/Footer'
import Alert from './components/common/alert/Alert'
import ProductDetailsPage from './components/buyer/shop/ProductDetailsCard'
import NotFound from './components/NotFound'
import PersonalInfo from './components/buyer/profile/PersonalInfo'
import Wishlist from './components/buyer/wishlist/Wishlist'
import ForgotPassword from './components/common/navbar/ForgotPassword'

const App = () => {
  const [loginModel, setLoginModel] = useState(false)
  return (
    <Router>
      <div className='app'>
        <Navbar loginModel={loginModel} />
        <Alert />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:productId' element={<ProductDetailsPage />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/profile/info' element={<PersonalInfo />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route
            path='/forgotPassword'
            element={
              <ForgotPassword
                setLoginModel={setLoginModel}
                loginModel={loginModel}
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
