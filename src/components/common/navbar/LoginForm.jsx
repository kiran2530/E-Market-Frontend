import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock } from 'lucide-react'

const LoginForm = ({ userType, onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({ email, password })
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className='space-y-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Email
        </label>
        <div className='relative'>
          <Mail
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={18}
          />
          <input
            type='email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className='pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            placeholder='Enter your email'
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Password
        </label>
        <div className='relative'>
          <Lock
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={18}
          />
          <input
            type='password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className='pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            placeholder='Enter your password'
          />
        </div>
      </motion.div>
      <motion.button
        type='submit'
        className={`w-full py-2 px-4 rounded-md text-white transition duration-300 ${
          userType === 'buyer'
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-green-600 hover:bg-green-700'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Login as {userType === 'buyer' ? 'Buyer' : 'Vendor'}
      </motion.button>
    </motion.form>
  )
}

export default LoginForm
