import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function AddProductForm () {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    console.log(formData)

    try {
      const response = await fetch(
        'https://e-market-backend-s5ap.onrender.com/api/product/vendor/create',
        {
          method: 'POST',
          headers: {
            authToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZW5kb3JJZCI6IjY2ZTI3N2JiYWYzMWJlYWE3YzEyMDVkMiIsImlhdCI6MTcyNjExNzkyOX0.toi_3-n4m9iLRf2JUK98AtlFT1slyJPR4d1ef0JlMn4'
          },
          body: formData
        }
      )

      const data = await response.json()
      console.log('Response:', data)

      if (data.success) {
        setMessage(data.message || 'Product added successfully')
        form.reset()
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
    <div className='min-h-screen flex items-center justify-center '>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-gray-300 bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl p-8 w-full max-w-4xl'
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
                className='mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out'
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
                step='0.10'
                className='mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out'
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
                className='mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out'
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
                className='mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out'
              >
                <option value=''>Select category</option>
                <option value='electronics'>Electronics</option>
                <option value='clothing'>Clothing</option>
                <option value='books'>Books</option>
                <option value='home'>Home & Garden</option>
                <option value='beauty'>Beauty & Personal Care</option>
              </select>

              {/* <input
                type="text"
                id="category"
                name="category"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
              /> */}
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className='space-y-2'>
              <label
                htmlFor='subcategory'
                className='block text-sm font-medium text-gray-700'
              >
                Subcategory
              </label>
              <select
                id='subCategory'
                name='subCategory'
                required
                className='mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out'
              >
                <option value=''>Select subcategory</option>
                <option value='smartphones'>Smartphones</option>
                <option value='laptops'>Laptops</option>
                <option value='accessories'>Accessories</option>
                <option value='tshirts'>T-Shirts</option>
                <option value='fiction'>Fiction</option>
                <option value='nonfiction'>Non-Fiction</option>
              </select>
              {/* <input
                type="text"
                id="subCategory"
                name="subCategory"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
              /> */}
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
                className='mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out'
              >
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
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
              rows={3}
              required
              className='mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out'
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
              className='mt-1 p-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
                transition duration-150 ease-in-out'
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            disabled={isLoading}
            className='w-full p-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 ease-in-out'
          >
            {isLoading ? 'Adding Product...' : 'Add Product'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
