import './index.css'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/common/navbar/Navbar'
import Home from './components/common/home/Home'
import About from './components/common/about/About'
import Shop from './components/buyer/shop/Shop'
import Cart from './components/buyer/cart/Cart'
import Dashboard from './components/vendor/dashboard/Dashboard'
import MyOrders from './components/buyer/myOrders/MyOrders'
import Footer from './components/common/footer/Footer'
import AlertState from './context/alert/AlertState'
import Alert from './components/common/alert/Alert'
import ProductDetailsPage from './components/buyer/shop/ProductDetailsCard'
import NotFound from './components/NotFound'
import PersonalInfo from './components/buyer/profile/PersonalInfo'

const App = () => {
  const [buyerData, setBuyerData] = useState({
    id: '2530',
    name: 'Kiran Nikam',
    email: 'kiran@gmail.com',
    phone: '+91 8975952690',
    address: 'Shelewadi, Radhanagari, Kolhapur',
    dateJoined: '2023-01-15',
    totalOrders: 8,
    totalSpent: 1249.99,
    wishlistCount: 5
  })

  const handleUpdateProfile = updatedData => {
    setBuyerData(updatedData)
  }

  return (
    <AlertState>
      <Router>
        <div className='app'>
          <Navbar />
          <Alert />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/shop' element={<Shop />} />
            <Route
              path='/product/:productId'
              element={<ProductDetailsPage />}
            />
            <Route path='/orders' element={<MyOrders />} />
            <Route
              path='/profile/info'
              element={<PersonalInfo buyer={buyerData} />}
            />

            <Route path='/cart' element={<Cart />} />
            <Route path='/dashboard/*' element={<Dashboard />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AlertState>
  )
}

export default App
