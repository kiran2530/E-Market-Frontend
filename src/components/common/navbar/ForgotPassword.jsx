import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
  Key,
  User,
  Briefcase
} from 'lucide-react'

import alertContext from '../../../context/alert/alertContext'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const ForgotPassword = ({ setLoginModel, loginModel }) => {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  const handleUserTypeSelect = type => {
    setUserType(type)

    if (type == 'buyer') setStep(2)
    else {
      showAlert(
        'The service is temporarily unavailable. Please try again later. We apologize for the inconvenience',
        'warning'
      )
    }
  }

  const handleEmailSubmit = async e => {
    e.preventDefault()
    // TODO: Implement API call to send OTP
    setIsLoading(true)
    try {
      const response = await fetch(`${backendUrl}/api/forgotPass/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      })

      const result = await response.json()

      if (result.success) {
        showAlert(result.message, 'success')
        setStep(3)
      } else {
        showAlert(result.message, 'danger')
      }
    } catch (err) {
      showAlert('Internal server error', 'danger')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async e => {
    e.preventDefault()
    // TODO: Implement API call to verify OTP
    setIsLoading(true)
    try {
      const response = await fetch(
        `${backendUrl}/api/forgotPass/validate-otp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            otp: otp
          })
        }
      )

      const result = await response.json()

      if (result.success) {
        showAlert(result.message, 'success')
        setStep(4)
      } else {
        showAlert(result.message, 'danger')
      }
    } catch (err) {
      showAlert('Internal server error', 'danger')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async e => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      showAlert('Passwords do not match', 'danger')
      return
    }
    if (newPassword.length < 6) {
      showAlert('Password must be at least 6 characters long', 'danger')
      return
    }
    // TODO: Implement API call to verify OTP

    setIsLoading(true)
    try {
      const response = await fetch(
        `${backendUrl}/api/forgotPass/resate-buyer-password`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            newPassword: newPassword
          })
        }
      )

      const result = await response.json()

      if (result.success) {
        showAlert(result.message, 'success')
        setStep(5)
      } else {
        showAlert(result.message, 'danger')
      }
    } catch (err) {
      showAlert('Internal server error', 'danger')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
  }

  const renderStep = (setLoginModel, loginModel) => {
    switch (step) {
      case 1:
        return (
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='space-y-6'
          >
            <h3 className='text-lg font-medium text-gray-900'>
              Select User Type
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUserTypeSelect('buyer')}
                className='flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md shadow-sm hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-gray-200'
              >
                <User className='h-8 w-8 text-indigo-600 mb-2' />
                <span className='text-sm font-medium text-gray-900'>Buyer</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUserTypeSelect('vendor')}
                className='flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md shadow-sm hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-gray-200'
              >
                <Briefcase className='h-8 w-8 text-indigo-600 mb-2' />
                <span className='text-sm font-medium text-gray-900'>
                  Vendor
                </span>
              </motion.button>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.form
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onSubmit={handleEmailSubmit}
            className='space-y-6'
          >
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email Address
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border mt-2'
                  placeholder='you@gmail.com'
                />
              </div>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-10'
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
                  <>
                    Send OTP
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        )
      case 3:
        return (
          <motion.form
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onSubmit={handleOtpSubmit}
            className='space-y-6'
          >
            <div>
              <label
                htmlFor='otp'
                className='block text-sm font-medium text-gray-700'
              >
                Enter OTP
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Key className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='text'
                  id='otp'
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                  className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md border p-2'
                  placeholder='Enter 6-digit OTP'
                />
              </div>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-10'
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
                  <>
                    Verify OTP
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        )
      case 4:
        return (
          <motion.form
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onSubmit={handlePasswordReset}
            className='space-y-6'
          >
            <div>
              <label
                htmlFor='newPassword'
                className='block text-sm font-medium text-gray-700'
              >
                New Password
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='password'
                  id='newPassword'
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                  className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md border p-2 mt-2'
                  placeholder='Enter new password'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700'
              >
                Confirm New Password
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='password'
                  id='confirmPassword'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md border p-2 mt-2'
                  placeholder='Confirm new password'
                />
              </div>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-10'
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
                  <>
                    Reset Password
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        )
      case 5:
        return (
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='text-center'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <CheckCircle className='mx-auto h-16 w-16 text-green-500' />
            </motion.div>
            <h2 className='mt-6 text-2xl font-semibold text-gray-900'>
              Password Reset Successful
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              You can now log in to your {userType} account with your new
              password.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              onClick={() => {
                // TODO: Implement navigation to login page
                console.log(`Navigating to ${userType} login page`)
                setLoginModel(true)
                console.log(loginModel)
              }}
            >
              Go to Login
              <ArrowRight className='ml-2 h-5 w-5' />
            </motion.button>
          </motion.div>
        )
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col py-12 sm:px-6 lg:px-8 px-2'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-4xl font-extrabold text-gray-900'>
          Forgot Password
        </h2>
        <p className='mt-2 text-center text-xs text-gray-600 '>
          Don't worry, we'll help you reset your password.
        </p>
      </div>

      <div className='mt-12 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <AnimatePresence mode='wait'>
            {renderStep(setLoginModel, loginModel)}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
