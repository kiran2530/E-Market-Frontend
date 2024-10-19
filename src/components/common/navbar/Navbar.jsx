import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  Search,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import styles from './Navbar.module.css'
import LoginModal from './LoginModal' // import the LoginModal component
import SignupModal from './SignupModal' // import the SignupModal component

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  let navigate = useNavigate()

  useEffect(() => {
    console.log('fetching')
    checkLogin()
  }, [])

  const checkLogin = () => {
    if (localStorage.getItem('authToken')) {
      setIsLoggedIn(true)
      setUserRole(localStorage.getItem('role'))
    }
  }

  const handleLogin = role => {
    setIsLoggedIn(true)
    setUserRole(role)
    setShowLoginModal(false)
    setIsMobileMenuOpen(false)
  }

  const handleSignup = role => {
    console.log(`Signed up as ${role}`)
    setShowSignupModal(false)
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    setIsMobileMenuOpen(false)
    localStorage.removeItem('authToken')
    localStorage.removeItem('role')
    navigate('/')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className='sticky top-0 z-50 shadow-md text-black bg-white bg-opacity-30 backdrop-blur-md'>
      <div className={styles.navbarContent}>
        <div className={styles.logoAndToggle}>
          <Link to='/' className={styles.logo}>
            <span>E-Market</span>
          </Link>
          <button
            className={styles.mobileMenuToggle}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <ul
          className={`${styles.navLinks} ${
            isMobileMenuOpen ? styles.mobileMenuOpen : ''
          }`}
          onClick={toggleMobileMenu}
        >
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          {isLoggedIn && userRole === 'buyer' && (
            <>
              <li>
                <Link to='/shop'>Shop</Link>
              </li>
              <li>
                <Link to='/orders'>My Orders</Link>
              </li>
            </>
          )}
          {isLoggedIn && userRole === 'vendor' && (
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
          )}
        </ul>

        <div
          className={`${styles.userControls} ${
            isMobileMenuOpen ? styles.mobileMenuOpen : ''
          }`}
        >
          {isLoggedIn ? (
            <>
              {userRole === 'buyer' && (
                <Link to='/cart' className={styles.cartIcon}>
                  <ShoppingCart />
                </Link>
              )}
              <button className={styles.iconButton}>
                <User />
              </button>
              <button onClick={handleLogout} className={styles.iconButton}>
                <LogOut />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLoginModal(true)}
                className={styles.textButton}
              >
                <LogIn className='mr-2 h-4 w-4' /> Login
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className={styles.textButton}
              >
                <UserPlus className='mr-2 h-4 w-4' /> Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSignup={handleSignup}
        />
      )}
    </nav>
  )
}

export default Navbar
