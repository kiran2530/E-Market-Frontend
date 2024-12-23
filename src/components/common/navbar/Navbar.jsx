import React, { useState, useEffect, useContext } from 'react'
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
import alertContext from '../../../context/alert/alertContext'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  let navigate = useNavigate()

  useEffect(() => {
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
    if (role == 'buyer') navigate('/shop')
    else if (role == 'vendor') navigate('/dashboard')
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
    showAlert('Logout Successfully', 'success')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
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
        >
          <li onClick={toggleMobileMenu}>
            <Link to='/'>Home</Link>
          </li>
          <li onClick={toggleMobileMenu}>
            <Link to='/about'>About</Link>
          </li>
          {isLoggedIn && userRole === 'buyer' && (
            <>
              <li onClick={toggleMobileMenu}>
                <Link to='/shop'>Shop</Link>
              </li>
              <li onClick={toggleMobileMenu}>
                <Link to='/orders'>My Orders</Link>
              </li>
            </>
          )}
          {isLoggedIn && userRole === 'vendor' && (
            <li onClick={toggleMobileMenu}>
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
                <Link
                  to='/cart'
                  className={styles.cartIcon}
                  onClick={toggleMobileMenu}
                >
                  <ShoppingCart />
                </Link>
              )}
              <Link
                to='/profile'
                className={styles.iconButton}
                onClick={toggleMobileMenu}
              >
                <User />
              </Link>
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
