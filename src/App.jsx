import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/common/navbar/Navbar'
import Home from './components/common/home/Home'
// import About from './About'
// import Shop from './Shop'
// import Cart from './Cart'
// import Dashboard from './Dashboard'

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          {/* <Route path='/about' component={About} />
          <Route path='/shop' component={Shop} />
          <Route path='/cart' component={Cart} />
          <Route path='/dashboard' component={Dashboard} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
