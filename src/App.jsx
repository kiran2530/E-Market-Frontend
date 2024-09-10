import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'

function App () {
  return (
    <Router>
      <div className='body-container'>
        <Home />
      </div>
    </Router>
  )
}

export default App
