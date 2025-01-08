import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  ShoppingCart,
  Search,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
  Phone
} from 'lucide-react'
import LoginModal from './LoginModal' // import the LoginModal component
import SignupModal from './SignupModal' // import the SignupModal component
import alertContext from '../../../context/alert/alertContext'
import BuyerProfileDropdown from './BuyerProfileDropdown'
import VendorProfileDropdown from './VendorProfileDropdown'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  let navigate = useNavigate()
  const location = useLocation()

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
    if (role == 'buyer') navigate('/shop')
    else if (role == 'vendor') navigate('/dashboard')
  }

  const handleSignup = role => {
    console.log(`Signed up as ${role}`)
    setShowSignupModal(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('role')
    navigate('/')
    showAlert('Logout Successfully', 'success')
  }

  return (
    <nav className='sticky top-0 z-50 shadow-md text-black bg-white bg-opacity-30 backdrop-blur-md pt-1'>
      <div className='flex justify-between mr-2 sm:mx-10'>
        <ul className='flex gap-8 ml-2 p-2 items-center font-semibold'>
          <Link to='/' className=''>
            <span>
              <img src='/images/companyLogo.png' alt='' className='w-16' />
            </span>
          </Link>

          <li
            className={`hidden sm:block ml-8 ${
              location.pathname === '/about' ? 'text-blue-600 border-b-2' : ''
            }`}
          >
            <Link to='/about'>About</Link>
          </li>
          {isLoggedIn && userRole === 'buyer' && (
            <>
              <li
                className={`${
                  location.pathname === '/shop'
                    ? 'text-blue-600 border-b-2'
                    : ''
                }`}
              >
                <Link to='/shop'>Shop</Link>
              </li>
            </>
          )}
          {isLoggedIn && userRole === 'vendor' && (
            <li
              className={`${
                location.pathname.includes('dashboard')
                  ? 'text-blue-600 border-b-2'
                  : ''
              }`}
            >
              <Link to='/dashboard'>Dashboard</Link>
            </li>
          )}
        </ul>

        <div className='flex gap-8 items-center'>
          {isLoggedIn ? (
            <>
              {userRole === 'buyer' && (
                <Link
                  to='/cart'
                  className={`hidden sm:flex text-xs font-semibold flex-col items-center ${
                    location.pathname === '/cart'
                      ? 'text-blue-600 border-b-2'
                      : ''
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                </Link>
              )}

              {userRole === 'buyer' && (
                <BuyerProfileDropdown
                  user={{ name: 'kiran', phone: '8975952690' }}
                  handleLogout={handleLogout}
                />
              )}

              {userRole === 'vendor' && (
                <VendorProfileDropdown
                  vendor={{
                    name: 'kiran',
                    shopName: 'Mauli Shop',
                    phone: '8975952690'
                  }}
                  handleLogout={handleLogout}
                />
              )}

              {/* <button
                onClick={handleLogout}
                className='flex flex-col items-center font-semibold text-xs'
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button> */}
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLoginModal(true)}
                className='text-sm flex items-center border border-black px-1 py-2 rounded-md bg-white hover:bg-blue-500 transition-colors duration-500 ease-in-out font-semibold'
              >
                <LogIn className='mr-1 h-4 w-4' /> Login
              </button>
              <button
                onClick={() => setShowSignupModal(true)}
                className='hidden text-sm sm:flex items-center border border-black px-1 py-2 rounded-md bg-white hover:bg-blue-500 transition-colors duration-500 ease-in-out font-semibold'
              >
                <UserPlus className='mr-1 h-4 w-4' /> Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          setShowSignupModal={setShowSignupModal}
        />
      )}

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSignup={handleSignup}
          setShowLoginModal={setShowLoginModal}
        />
      )}
    </nav>
  )
}

export default Navbar
