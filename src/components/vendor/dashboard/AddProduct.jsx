import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import stateData from '../../../data/states.json'
import cityData from '../../../data/districts.json'
import alertContext from '../../../context/alert/alertContext'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function AddProductForm () {
  const [isLoading, setIsLoading] = useState(false)

  // Dummy data for dropdowns
  const countries = ['India']
  const states = stateData.states
  const cities = cityData

  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')

  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      console.log(formData)

      const response = await fetch(`${backendUrl}/api/product/vendor/create`, {
        method: 'POST',
        headers: {
          authToken: localStorage.getItem('authToken')
        },
        body: formData
      })

      const data = await response.json()
      console.log('Response:', data)

      if (data.success) {
        form.reset()
        setSelectedCountry('')
        setSelectedState('')
        showAlert(data.message, 'success')
      } else {
        showAlert(data.message, 'danger')
      }
    } catch (error) {
      showAlert(data.message || 'Error adding Product', 'danger')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='px-4 pb-6 min-h-screen flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl p-8 w-full max-w-4xl'
      >
        <h2 className='text-3xl font-bold text-center mb-5 text-black bg-gray-100 p-2 rounded-full'>
          Add Product
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
                className='mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className=' flex gap-2 justify-center items-center'
            >
              <div>
                <label
                  htmlFor='price'
                  className=' text-sm font-medium text-gray-700'
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
                  className='mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-1'
                />
              </div>
              <div>
                <label
                  htmlFor='priceCategory'
                  className='block text-sm font-medium text-gray-700'
                >
                  Price Category
                </label>
                <select
                  id='priceCategory'
                  name='priceCategory'
                  required
                  className='mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-1'
                >
                  <option value=''>Select Price Category</option>
                  <option value='Item'>Per Item</option>
                  <option value='Kg'>Per Kg</option>
                  <option value='100Kg'>Per Quintal(100Kg)</option>
                  <option value='L'>Per Liter</option>
                  <option value='Box'>Per Box</option>
                  <option value='Dozen'>Per Dozen</option>
                </select>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className=' flex gap-2 justify-center items-center'
            >
              <div>
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
                  className='mt-1 block w-full rounded-md border border-black shadow-sm focus:ring focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-1'
                />
              </div>
              <div>
                <label
                  htmlFor='quantityCategory'
                  className='block text-sm font-medium text-gray-700'
                >
                  Price Category
                </label>
                <select
                  id='quantityCategory'
                  name='quantityCategory'
                  required
                  className='mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-1'
                >
                  <option value=''>Select Quantity Category</option>
                  <option value='Item'>Item</option>
                  <option value='Kg'>Kg</option>
                  <option value='100Kg'>Quintal(100Kg)</option>
                  <option value='L'>Liter</option>
                  <option value='Box'>Box</option>
                  <option value='Dozen'>Dozen</option>
                </select>
              </div>
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
                className='mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
              >
                <option value=''>Select category</option>
                <option value='Crops'>Crops</option>
                <option value='Fruits'>Fruits</option>
                <option value='Flowers'>Flowers</option>
                <option value='Vegetables'>Vegetables</option>
                <option value='Meat'>Meat</option>
                <option value='Grains'>Grains</option>
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
                className='mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
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
                className='mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
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
              className='mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out px-4 py-2'
            ></textarea>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className='space-y-2'>
            <label
              htmlFor='image'
              className='block text-sm font-medium text-gray-700'
            >
              Product Image (Upload image in 3:2 ratio for better view)
            </label>
            <input
              type='file'
              id='image'
              name='image'
              accept='image/*'
              required
              className='mt-1 block w-full text-sm text-black
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-100 file:text-violet-700
                hover:file:bg-violet-200
                transition duration-150 ease-in-out h-12 border border-dashed border-black rounded-full p-1'
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
                className='mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
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
                className='mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
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
                className='mt-1 block w-full rounded-md border border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
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
            className='w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 ease-in-out flex justify-center'
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
              'Add Product'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
