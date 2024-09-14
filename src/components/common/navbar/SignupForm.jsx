import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Phone, MapPin } from 'lucide-react'

const SignupForm = ({ userType, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  })

  const handleChange = e => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(formData)

    onSubmit(formData)
  }

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
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
        variants={inputVariants}
        initial='hidden'
        animate='visible'
        transition={{ delay: 0.1 }}
      >
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Name
        </label>
        <div className='relative'>
          <User
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={18}
          />
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            placeholder='Enter your name'
          />
        </div>
      </motion.div>

      <motion.div
        variants={inputVariants}
        initial='hidden'
        animate='visible'
        transition={{ delay: 0.2 }}
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
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            placeholder='Enter your email'
          />
        </div>
      </motion.div>

      <motion.div
        variants={inputVariants}
        initial='hidden'
        animate='visible'
        transition={{ delay: 0.3 }}
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
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
            className='pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            placeholder='Create a password'
          />
        </div>
      </motion.div>

      <motion.div
        variants={inputVariants}
        initial='hidden'
        animate='visible'
        transition={{ delay: 0.4 }}
      >
        <label
          htmlFor='phone'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Phone
        </label>
        <div className='relative'>
          <Phone
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={18}
          />
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
            className='pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            placeholder='Enter your phone number'
          />
        </div>
      </motion.div>

      <motion.div
        variants={inputVariants}
        initial='hidden'
        animate='visible'
        transition={{ delay: 0.5 }}
      >
        <label
          htmlFor='street'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Address
        </label>
        <div className='relative'>
          <MapPin
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            size={18}
          />
          <input
            type='text'
            id='street'
            name='address.street'
            value={formData.address.street}
            onChange={handleChange}
            required
            className='pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            placeholder='Street address'
          />
        </div>
      </motion.div>

      <motion.div
        className='grid grid-cols-2 gap-4'
        variants={inputVariants}
        initial='hidden'
        animate='visible'
        transition={{ delay: 0.6 }}
      >
        <div>
          <input
            type='text'
            id='city'
            name='address.city'
            value={formData.address.city}
            onChange={handleChange}
            required
            className='w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2'
            placeholder='City'
          />
        </div>
        <div>
          <input
            type='text'
            id='state'
            name='address.state'
            value={formData.address.state}
            onChange={handleChange}
            required
            className='w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2'
            placeholder='State'
          />
        </div>
      </motion.div>

      <motion.div
        className='grid grid-cols-2 gap-4'
        variants={inputVariants}
        initial='hidden'
        animate='visible'
        transition={{ delay: 0.7 }}
      >
        <div>
          <input
            type='text'
            id='postalCode'
            name='address.postalCode'
            value={formData.address.postalCode}
            onChange={handleChange}
            required
            className='w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2'
            placeholder='Postal Code'
          />
        </div>
        <div>
          <input
            type='text'
            id='country'
            name='address.country'
            value={formData.address.country}
            onChange={handleChange}
            required
            className='w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2'
            placeholder='Country'
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
        Sign Up as {userType === 'buyer' ? 'Buyer' : 'Vendor'}
      </motion.button>
    </motion.form>
  )
}

export default SignupForm
