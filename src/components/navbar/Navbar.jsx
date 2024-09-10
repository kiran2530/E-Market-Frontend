import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const role = 'buyer' // Change this to test vendor vs buyer links

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {/* Logo */}
        <Link to='/' className={styles.navLogo}>
          E-Market
        </Link>

        {/* Toggle button for mobile */}
        <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <i className='fas fa-times'></i>
          ) : (
            <i className='fas fa-bars'></i>
          )}
        </button>

        {/* Navbar links */}
        <ul
          className={`${styles.navLinks} ${
            isMobileMenuOpen ? styles.showMenu : ''
          }`}
        >
          <li>
            <Link to='/' className={styles.navLink}>
              Home
            </Link>
          </li>

          {/* Buyer-Specific Links */}
          {role !== 'vendor' && (
            <>
              <li>
                <Link to='/products' className={styles.navLink}>
                  Shop
                </Link>
              </li>

              <li>
                <Link to='/buyer/profile' className={styles.navLink}>
                  Profile
                </Link>
              </li>
            </>
          )}

          {/* Vendor-Specific Links */}
          {role === 'vendor' && (
            <>
              <li>
                <Link to='/vendor/dashboard' className={styles.navLink}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to='/vendor/profile' className={styles.navLink}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to='/vendor/products/add' className={styles.navLink}>
                  Add Product
                </Link>
              </li>
            </>
          )}

          {/* Logout (optional) */}
          <li>
            <button
              className={styles.logoutButton}
              onClick={() => console.log('Logout')}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
