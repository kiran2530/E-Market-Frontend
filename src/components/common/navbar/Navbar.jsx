import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  Search,
  User,
  LogIn,
  UserPlus,
  Package,
  LayoutDashboard,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  let navigate = useNavigate()

  const handleLogin = role => {
    setIsLoggedIn(true)
    setUserRole(role)
    setShowLoginModal(false)
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    setIsMobileMenuOpen(false)
    navigate('/')
  }

  const handleSignup = role => {
    console.log(`Signing up as ${role}`)
    setShowSignupModal(false)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const NavLinks = () => (
    <>
      <li>
        <Link to='/' onClick={() => setIsMobileMenuOpen(false)}>
          Home
        </Link>
      </li>
      <li>
        <Link to='/about' onClick={() => setIsMobileMenuOpen(false)}>
          About
        </Link>
      </li>
      {isLoggedIn && userRole === 'buyer' && (
        <>
          <li>
            <Link to='/shop' onClick={() => setIsMobileMenuOpen(false)}>
              Shop
            </Link>
          </li>
          <li>
            <Link to='/orders' onClick={() => setIsMobileMenuOpen(false)}>
              My Orders
            </Link>
          </li>
        </>
      )}
      {isLoggedIn && userRole === 'vendor' && (
        <>
          <li>
            <Link to='/dashboard' onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to='/products' onClick={() => setIsMobileMenuOpen(false)}>
              My Products
            </Link>
          </li>
        </>
      )}
    </>
  )

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.logoAndToggle}>
          <Link to='/' className={styles.logo}>
            <Package className={styles.logoIcon} />
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
          <NavLinks />
        </ul>

        <div
          className={`${styles.userControls} ${
            isMobileMenuOpen ? styles.mobileMenuOpen : ''
          }`}
        >
          {isLoggedIn && userRole === 'buyer' && (
            <div className={styles.searchBar}>
              <input
                type='text'
                placeholder='Search products...'
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                <Search className='mr-1 h-4 w-4' />
                <span className='sr-only'>Search</span>
              </button>
            </div>
          )}
          {isLoggedIn ? (
            <>
              {userRole === 'buyer' && (
                <Link
                  to='/cart'
                  className={styles.cartIcon}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart />
                </Link>
              )}
              {userRole === 'vendor' && (
                <Link
                  to='/add-product'
                  className={styles.iconButton}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard />
                  <span className='sr-only'>Add Product</span>
                </Link>
              )}
              <button className={styles.iconButton}>
                <User />
                <span className='sr-only'>Profile</span>
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
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Login as:</h2>
            <button
              onClick={() => handleLogin('buyer')}
              className={styles.modalButton}
            >
              Buyer
            </button>
            <button
              onClick={() => handleLogin('vendor')}
              className={styles.modalButton}
            >
              Vendor
            </button>
            <button
              onClick={() => setShowLoginModal(false)}
              className={styles.modalCloseButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showSignupModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Sign up as:</h2>
            <button
              onClick={() => handleSignup('buyer')}
              className={styles.modalButton}
            >
              Buyer
            </button>
            <button
              onClick={() => handleSignup('vendor')}
              className={styles.modalButton}
            >
              Vendor
            </button>
            <button
              onClick={() => setShowSignupModal(false)}
              className={styles.modalCloseButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
