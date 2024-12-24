import React, { useState, useContext } from 'react'
const backendUrl = import.meta.env.VITE_BACKEND_URL
import alertContext from '../../../context/alert/alertContext'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'

const SignupModal = ({ onClose, onSignup, setShowLoginModal }) => {
  // --------- Veriables, state and hooks declarations --------

  //  create an state for hold the details of the signup user
  const [role, setRole] = useState('buyer')
  const [signupDetails, setSignupDetails] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false)

  // use as go to the back or next page using navigate('pathname')
  //   let navigate = useNavigate()

  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  // ---------------------- Functions ------------------------
  // onchange function handles inputs and set the userDetails state

  const onchange = e => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value })
  }

  // fuction for checking mail
  function isEmail (input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(input)
  }

  // handling the signup for new user and save the auth-token into the local storage

  const handleSignup = async userRole => {
    if (
      signupDetails.name === '' ||
      !isEmail(signupDetails.email) ||
      signupDetails.password === '' ||
      signupDetails.address === '' ||
      signupDetails.phone === ''
    ) {
      showAlert('Enter All Correct Details', 'warning')
      return
    }
    setIsLoading(true)
    let url = ''
    if (userRole === 'vendor') {
      url = `${backendUrl}/api/auth/vendor/register`
    }
    if (userRole === 'buyer') {
      url = `${backendUrl}/api/auth/buyer/register`
    }

    try {
      const token = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: signupDetails.name,
          email: signupDetails.email,
          password: signupDetails.password,
          phone: signupDetails.phone,
          address: signupDetails.address
        })
      })

      const tokenData = await token.json()

      if (tokenData.success) {
        setSignupDetails({})
        onSignup(userRole)
        showAlert(tokenData.message, 'success')
      } else {
        showAlert(tokenData.message, 'warning')
      }
    } catch (err) {
      showAlert(tokenData.message, 'danger')
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
      <div className='bg-white px-10 py-6 min-w-80 max-w-lg sm:max-w-xl relative rounded-2xl'>
        <h1
          className={`mt-4 mx-10 sm:mx-14 text-2xl text-center font-bold ${
            role === 'buyer'
              ? 'text-blue-700 rounded-full bg-gray-200 px-4 py-1'
              : 'text-green-700 rounded-full bg-gray-200 px-4 py-1'
          } `}
        >
          {role.toUpperCase()} SIGN-UP
        </h1>
        <div className='flex justify-center mb-4 pt-1'>
          <button
            className={`${
              role === 'buyer'
                ? 'text-green-600 hover:text-green-700 border-b border-transparent hover:border-b hover:border-green-500'
                : 'text-blue-500 hover:text-blue-600 border-b border-transparent hover:border-b hover:border-blue-500'
            } text-xs sm:text-sm`}
            onClick={() => {
              if (role === 'buyer') setRole('vendor')
              else setRole('buyer')
            }}
          >
            Become a {role === 'buyer' ? 'Vendor' : 'Buyer'}
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
          <div>
            <h3 className='font-semibold'>Name</h3>
            <input
              type='text'
              placeholder='Name'
              className='w-full p-2 border border-black rounded-md mb-3'
              required
              name='name'
              value={signupDetails.name}
              onChange={onchange}
            />
          </div>
          <div>
            <h3 className='font-semibold'>Email</h3>
            <input
              type='email'
              placeholder='Email'
              className='w-full p-2 border border-black rounded-md mb-3'
              name='email'
              value={signupDetails.email}
              onChange={onchange}
              required
            />
          </div>
          <div>
            <h3 className='font-semibold'>Contact Number</h3>
            <input
              type='text'
              placeholder='Contact Number'
              className='w-full p-2 border border-black rounded-md mb-3'
              name='phone'
              value={signupDetails.phone}
              onChange={onchange}
              required
            />
          </div>
          <div>
            <h3 className='font-semibold'>Address</h3>
            <input
              type='text'
              placeholder='Address'
              className='w-full p-2 border border-black rounded-md mb-3'
              name='address'
              value={signupDetails.address}
              onChange={onchange}
              required
            />
          </div>
          <div>
            <h3 className='font-semibold'>Password</h3>
            <input
              type={isShowPassword ? 'text' : 'password'}
              placeholder='Password'
              className='w-full p-2 border border-black rounded-md mb-1'
              name='password'
              value={signupDetails.password}
              onChange={onchange}
              required
            />
          </div>
          <div className='text-xs flex ml-1'>
            <input
              type='checkBox'
              className='mr-1'
              checked={isShowPassword}
              onChange={() => setIsShowPassword(!isShowPassword)}
            />{' '}
            Show Password
          </div>
          <div className='flex mt-4'>
            <button
              className={`text-lg font-semibold text-white p-2 w-full rounded-full ${
                role === 'buyer' ? 'bg-blue-600' : 'bg-green-600'
              } flex justify-center`}
              onClick={() => {
                handleSignup(role)
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
                'Signup'
              )}
            </button>
          </div>
        </form>

        <div className='w-full border-t border-black mt-4'></div>

        <div className='flex justify-center pt-1'>
          <button
            className={`${
              role === 'buyer'
                ? 'text-green-600 hover:text-green-700 border-b border-transparent hover:border-b hover:border-green-500'
                : 'text-blue-500 hover:text-blue-600 border-b border-transparent hover:border-b hover:border-blue-500'
            } text-xs sm:text-sm`}
            onClick={() => {
              if (role === 'buyer') setRole('vendor')
              else setRole('buyer')
            }}
          >
            Become a {role === 'buyer' ? 'Vendor' : 'Buyer'}
          </button>
        </div>

        <div className='flex text-sm justify-center'>
          <h1 className='text-gray-600'>Have allready account?</h1>
          <button
            className='ml-1 font-bold'
            onClick={() => {
              onClose()
              setShowLoginModal(true)
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupModal
