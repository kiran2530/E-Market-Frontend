import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const AuthModal = ({ isOpen, onClose, initialMode }) => {
  const [mode, setMode] = useState(initialMode)
  const [userType, setUserType] = useState(null)

  const handleLogin = (role, userData) => {
    console.log(`Logging in as ${role}`, userData)
    onClose()
  }

  const handleSignup = (role, userData) => {
    console.log(`Signing up as ${role}`, userData)
    onClose()
  }

  const resetModal = () => {
    setMode(initialMode)
    setUserType(null)
  }

  const handleClose = () => {
    onClose()
    resetModal()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden'
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          >
            <div className='relative h-40'>
              <img
                src='/placeholder.svg?height=160&width=384'
                alt='Auth background'
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-b from-transparent to-white'></div>
              <button
                onClick={handleClose}
                className='absolute top-2 right-2 text-white hover:text-gray-200 transition-colors'
              >
                <X size={24} />
              </button>
            </div>
            <div className='p-6'>
              <motion.h2
                className='text-2xl font-bold text-gray-800 mb-6 text-center'
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {mode === 'login' ? 'Welcome Back!' : 'Join Our Community'}
              </motion.h2>

              {!userType ? (
                <motion.div
                  className='space-y-4'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={() => setUserType('buyer')}
                    className='w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {mode === 'login' ? 'Login as Buyer' : 'Sign Up as Buyer'}
                  </motion.button>
                  <motion.button
                    onClick={() => setUserType('vendor')}
                    className='w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {mode === 'login' ? 'Login as Vendor' : 'Sign Up as Vendor'}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {mode === 'login' ? (
                    <LoginForm
                      userType={userType}
                      onSubmit={data => handleLogin(userType, data)}
                    />
                  ) : (
                    <SignupForm
                      userType={userType}
                      onSubmit={data => handleSignup(userType, data)}
                    />
                  )}
                </motion.div>
              )}

              <motion.div
                className='mt-6 text-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {mode === 'login' ? (
                  <p className='text-gray-600'>
                    Don't have an account?{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className='text-blue-600 hover:underline font-semibold'
                    >
                      Sign Up
                    </button>
                  </p>
                ) : (
                  <p className='text-gray-600'>
                    Already have an account?{' '}
                    <button
                      onClick={() => setMode('login')}
                      className='text-blue-600 hover:underline font-semibold'
                    >
                      Login
                    </button>
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AuthModal
