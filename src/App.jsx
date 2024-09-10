import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/navbar/Navbar'
import './App.css'
import React from 'react'

function App () {
  return (
    <Router>
      <div className='app-container'>
        <Navbar />
        <Home />
      </div>
    </Router>
  )
}

export default App
