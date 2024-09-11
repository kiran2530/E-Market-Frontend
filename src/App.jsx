import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/common/navbar/Navbar'
import Home from './components/common/home/Home'
import About from './components/common/about/About'
import Shop from './components/buyer/shop/Shop'
import Cart from './components/buyer/cart/Cart'
import Dashboard from './components/vendor/dashboard/Dashboard'
import MyOrders from './components/buyer/myOrders/MyOrders'
import Profile from './components/common/profile/Profile'
import MyProducts from './components/vendor/myProducts/MyProducts'
import AddProduct from './components/vendor/addProduct/AddProduct'

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/products' element={<MyProducts />} />
          <Route path='/add-product' element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
