import React, { useState } from 'react'
import { motion } from 'framer-motion'
import stateData from '../../../data/states.json'
import cityData from '../../../data/districts.json'

export default function AddProductForm () {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Dummy data for dropdowns
  const countries = ['India']
  const states = stateData.states
  const cities = cityData

  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(
        'https://e-market-backend-s5ap.onrender.com/api/product/vendor/create',
        {
          method: 'POST',
          headers: {
            authToken: localStorage.getItem('authToken')
          },
          body: formData
        }
      )

      const data = await response.json()
      console.log('Response:', data)

      if (data.success) {
        setMessage(data.message || 'Product added successfully')
        form.reset()
        setSelectedCountry('')
        setSelectedState('')
      } else {
        throw new Error(data.message || 'Failed to add product')
      }
    } catch (error) {
      console.error('Error adding product:', error)
      setMessage(
        error instanceof Error
          ? error.message
          : 'Failed to add product. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-4'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl p-8 w-full max-w-4xl'
      >
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <motion.div whileHover={{ scale: 1.02 }} className='space-y-2'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Product Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className='space-y-2'>
              <label
                htmlFor='price'
                className='block text-sm font-medium text-gray-700'
              >
                Price
              </label>
              <input
                type='number'
                id='price'
                name='price'
                required
                min='0'
                step='0.01'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className='space-y-2'>
              <label
                htmlFor='quantity'
                className='block text-sm font-medium text-gray-700'
              >
                Quantity
              </label>
              <input
                type='number'
                id='quantity'
                name='quantity'
                required
                min='0'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className='space-y-2'>
              <label
                htmlFor='category'
                className='block text-sm font-medium text-gray-700'
              >
                Category
              </label>
              <select
                id='category'
                name='category'
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
              >
                <option value=''>Select category</option>
                <option value='electronics'>Crops</option>
                <option value='clothing'>Fruits</option>
                <option value='books'>Flowers</option>
                <option value='home'>Vegetables</option>
                <option value='beauty'>Beauty & Personal Care</option>
              </select>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className='space-y-2'>
              <label
                htmlFor='subCategory'
                className='block text-sm font-medium text-gray-700'
              >
                SubCategory
              </label>
              <select
                id='subCategory'
                name='subCategory'
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
              >
                <option value=''>Select subcategory</option>
                <option value='smartphones'>Organic</option>
                <option value='laptops'>With Out Chemical</option>
                <option value='accessories'>Accessories</option>
                <option value='tshirts'>Fresh</option>
                <option value='fiction'>Fiction</option>
                <option value='nonfiction'>Non-Fiction</option>
              </select>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className='space-y-2'>
              <label
                htmlFor='status'
                className='block text-sm font-medium text-gray-700'
              >
                Status
              </label>
              <select
                id='status'
                name='status'
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
              >
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
                <option value='ready'>Ready</option>
                <option value='available'>Available</option>
                <option value='notAvailable'>Not Available</option>
              </select>
            </motion.div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} className='space-y-2'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              rows={4}
              required
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out px-4 py-2'
            ></textarea>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className='space-y-2'>
            <label
              htmlFor='image'
              className='block text-sm font-medium text-gray-700'
            >
              Product Image
            </label>
            <input
              type='file'
              id='image'
              name='image'
              accept='image/*'
              required
              className='mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
                transition duration-150 ease-in-out h-12'
            />
          </motion.div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <motion.div whileHover={{ scale: 1.02 }} className='space-y-2'>
              <label
                htmlFor='country'
                className='block text-sm font-medium text-gray-700'
              >
                Country
              </label>
              <select
                id='country'
                name='country'
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
                onChange={e => setSelectedCountry(e.target.value)}
                value={selectedCountry}
              >
                <option value=''>Select country</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className='space-y-2'>
              <label
                htmlFor='state'
                className='block text-sm font-medium text-gray-700'
              >
                State
              </label>
              <select
                id='state'
                name='state'
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
                onChange={e => setSelectedState(e.target.value)}
                value={selectedState}
              >
                <option value=''>Select state</option>
                {selectedCountry &&
                  states.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
              </select>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className='space-y-2'>
              <label
                htmlFor='city'
                className='block text-sm font-medium text-gray-700'
              >
                City
              </label>
              <select
                id='city'
                name='city'
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
              >
                <option value=''>Select city</option>
                {selectedState &&
                  cities[selectedState].map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </motion.div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            disabled={isLoading}
            className='w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 ease-in-out'
          >
            {isLoading ? 'Adding Product...' : 'Add Product'}
          </motion.button>
        </form>
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`mt-4 text-center ${
              message.includes('successfully')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {message}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
