import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
const backendUrl = import.meta.env.VITE_BACKEND_URL
import alertContext from '../../../context/alert/alertContext'
import { X } from 'lucide-react'

const LoginModal = ({ onClose, onLogin, setShowSignupModal }) => {
  // --------- Veriables, state and hooks declarations --------

  //  create an state for hold the details of the login user
  const [role, setRole] = useState('buyer')
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false)

  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  // ---------------------- Functions ------------------------

  // onchange function handles inputs and set the userDetails state
  const onchange = e => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })
  }

  // fuction for checking mail
  function isEmail (input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(input)
  }

  // handleLogin function handle the login functionality.
  const handleLogin = async userRole => {
    if (!isEmail(loginDetails.email) || loginDetails.password === '') {
      showAlert("Enter Correct Email I'd & Password", 'warning')
      return
    }
    setIsLoading(true)
    let url = ''
    if (userRole === 'vendor') {
      url = `${backendUrl}/api/auth/vendor/login`
    }
    if (userRole === 'buyer') {
      url = `${backendUrl}/api/auth/buyer/login`
    }

    try {
      const token = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: loginDetails.email,
          password: loginDetails.password
        })
      })

      const tokenData = await token.json()

      if (tokenData.success) {
        localStorage.setItem('authToken', tokenData.authToken)
        localStorage.setItem('role', tokenData.role)
        // console.log('Login Successfully')
        showAlert('Login Successfully', 'success')
        setLoginDetails({})
        onLogin(userRole)
      } else {
        showAlert(tokenData.message, 'danger')
      }
    } catch (err) {
      showAlert('Internal server error', 'danger')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div
      className={`h-screen w-screen absolute top-0 ${
        role === 'buyer' ? 'bg-blue-500' : 'bg-green-500'
      } bg-opacity-80 flex justify-center items-center`}
    >
      <div className='bg-white px-10 py-6 min-w-[340px] max-w-lg sm:max-w-xl relative rounded-2xl'>
        <h1
          className={`mt-4 w-full text-2xl text-center font-bold ${
            role === 'buyer'
              ? 'text-blue-700 rounded-full bg-gray-200 px-4 py-1'
              : 'text-green-700 rounded-full bg-gray-200 px-4 py-1'
          } `}
        >
          {role.toUpperCase()} LOGIN
        </h1>
        <div className='flex justify-center mb-4 pt-1'>
          <button
            className={`${
              role === 'buyer'
                ? 'text-green-600 hover:text-green-700 border-b border-transparent hover:border-b hover:border-green-500'
                : 'text-blue-500 hover:text-blue-600 border-b border-transparent hover:border-b hover:border-blue-500'
            } text-xs`}
            onClick={() => {
              if (role === 'buyer') setRole('vendor')
              else setRole('buyer')
            }}
          >
            Login as {role === 'buyer' ? 'Vendor' : 'Buyer'}
          </button>
        </div>
        <button
          onClick={onClose}
          className='absolute p-1 rounded-full bg-gray-200 hover:bg-gray-400 focus:outline-none top-2 right-2'
          aria-label='Close'
        >
          <X className='w-6 h-6 text-red-600' />
        </button>

        <form onSubmit={e => e.preventDefault()}>
          <div className=''>
            <h3 className='font-semibold'>Email</h3>
            <input
              type='email'
              placeholder='Email'
              className='w-full p-2 border border-black rounded-md mb-3'
              name='email'
              value={loginDetails.email}
              onChange={onchange}
              required
            />
          </div>
          <div className=''>
            <h3 className='font-semibold'>Password</h3>
            <input
              type={isShowPassword ? 'text' : 'password'}
              placeholder='Password'
              className='w-full p-2 border border-black rounded-md'
              name='password'
              value={loginDetails.password}
              onChange={onchange}
              required
            />
          </div>
          <div className='mt-2  flex justify-between items-center'>
            <div className='text-xs flex'>
              <input
                type='checkBox'
                className='mr-1'
                checked={isShowPassword}
                onChange={() => setIsShowPassword(!isShowPassword)}
              />{' '}
              Show Password
            </div>
            <a
              href='/forgotPassword'
              target='blank'
              className='text-xs text-gray-600 hover:text-black  border-b border-transparent hover:border-b hover:border-gray-600'
            >
              Forgot Password?
            </a>
          </div>
          <div className='flex mt-8'>
            <button
              className={`text-lg font-semibold text-white p-2 w-full rounded-full ${
                role === 'buyer' ? 'bg-blue-600' : 'bg-green-600'
              } flex justify-center`}
              onClick={() => {
                handleLogin(role)
              }}
            >
              {isLoading ? (
                <motion.div
                  className='w-6 h-6 border-t-2 border-white rounded-full animate-spin'
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
        <div className='w-full border-t border-black mt-2'></div>
        <div className='flex justify-center pt-1'>
          <button
            className={`${
              role === 'buyer'
                ? 'text-green-600 hover:text-green-700 border-b border-transparent hover:border-b hover:border-green-500'
                : 'text-blue-400 hover:text-blue-600 border-b border-transparent hover:border-b hover:border-blue-500'
            } text-xs sm:text-sm`}
            onClick={() => {
              if (role === 'buyer') setRole('vendor')
              else setRole('buyer')
            }}
          >
            Login as {role === 'buyer' ? 'Vendor' : 'Buyer'}
          </button>
        </div>

        <div className='flex text-sm justify-center'>
          <h1 className='text-gray-600'>Don't have account?</h1>
          <button
            className='ml-1 font-bold'
            onClick={() => {
              onClose()
              setShowSignupModal(true)
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
