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

  const [finalPayout, setFinalPayout] = useState({
    platformFee: 0,
    paymentFee: 0,
    gstOnPlatformFee: 0,
    totalDeduction: 0,
    vendorReceives: 0
  })

  const [price, SetPrice] = useState('')
  const [discount, SetDiscount] = useState('')

  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')

  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  const prizeOnChange = (amount, discount) => {
    let value = parseInt(amount, 10) || ''
    SetPrice(value)

    value -= (value * discount) / 100

    const platformFee = ((value * 10) / 100).toFixed(2)
    const paymentFee = ((value * 2) / 100).toFixed(2)
    const gstOnPlatformFee = ((platformFee * 18) / 100).toFixed(2)

    const totalDeduction = (
      parseFloat(platformFee) +
      parseFloat(paymentFee) +
      parseFloat(gstOnPlatformFee)
    ).toFixed(2)
    const vendorReceives = (value - totalDeduction).toFixed(2)

    setFinalPayout({
      platformFee: platformFee,
      paymentFee: paymentFee,
      gstOnPlatformFee: gstOnPlatformFee,
      totalDeduction: totalDeduction,
      vendorReceives: vendorReceives
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const finalPayoutData = {
      platformFee: Number(finalPayout.platformFee),
      paymentFee: Number(finalPayout.paymentFee),
      gstOnPlatformFee: Number(finalPayout.gstOnPlatformFee),
      totalDeduction: Number(finalPayout.totalDeduction),
      vendorReceives: Number(finalPayout.vendorReceives)
    }

    formData.append('finalPayout', JSON.stringify(finalPayoutData))

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
    <div className='pb-6 min-h-screen flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl p-4 w-full max-w-4xl '
      >
        <h2 className='text-3xl font-bold text-center mb-5 text-black bg-gray-100 p-1 rounded-full'>
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <motion.div className='space-y-3 shadow-xl rounded-lg border border-gray-300 p-4'>
              <div>
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
                  placeholder='Name'
                  required
                  className='mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
                />
              </div>
              {/* price Prediction feild */}
              <div className='mt-2'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Price Prediction
                </label>
                <div className='bg-gray-100 p-4 rounded-md shadow-sm border border-gray-200'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-gray-600'>Average Price:</span>
                    <span className='font-semibold text-blue-600'>
                      ₹ averagePrice || '--'
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-600'>
                      Predicted Future Price:
                    </span>
                    <span className='font-semibold text-green-600'>
                      ₹ futurePrice || '--'
                    </span>
                  </div>
                </div>
              </div>
              <motion.div className='space-y-2'>
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
                  className='mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
                >
                  <option value='' disabled selected>
                    Select category
                  </option>
                  <option value='Crops'>Crops</option>
                  <option value='Fruits'>Fruits</option>
                  <option value='Flowers'>Flowers</option>
                  <option value='Vegetables'>Vegetables</option>
                  <option value='Meat'>Meat</option>
                  <option value='Grains'>Grains</option>
                </select>
              </motion.div>
              <motion.div className='space-y-2'>
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
                  className='mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
                >
                  <option value='' disabled selected>
                    Select subcategory
                  </option>
                  <option value='Organic'>Organic</option>
                  <option value='With Out Chemical'>With Out Chemical</option>
                  <option value='Accessories'>Accessories</option>
                  <option value='Fresh'>Fresh</option>
                  <option value='Fiction'>Fiction</option>
                  <option value='Non-Fiction'>Non-Fiction</option>
                </select>
              </motion.div>
              <motion.div className='space-y-2'>
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
                  className='mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
                >
                  <option value='' disabled selected>
                    Select
                  </option>
                  <option value='active'>Active</option>
                  <option value='inactive'>Inactive</option>
                  <option value='ready'>Ready</option>
                  <option value='available'>Available</option>
                  <option value='notAvailable'>Not Available</option>
                </select>
              </motion.div>
              <motion.div className=' flex gap-2 justify-center items-center'>
                <div className='flex-[2]'>
                  <label
                    htmlFor='quantity'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Total Quantity
                  </label>
                  <input
                    type='number'
                    id='quantity'
                    name='quantity'
                    placeholder='Quantity'
                    required
                    min='0'
                    className='mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:ring focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
                  />
                </div>
                <div className='flex-[1]'>
                  <label
                    htmlFor='quantityCategory'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Quantity Category
                  </label>
                  <select
                    id='quantityCategory'
                    name='quantityCategory'
                    required
                    className='mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-1'
                  >
                    <option value='' disabled selected>
                      Select
                    </option>
                    <option value='Item'>Item</option>
                    <option value='Kg'>Kg</option>
                    <option value='100Kg'>Quintal(100Kg)</option>
                    <option value='L'>Liter</option>
                    <option value='Box'>Box</option>
                    <option value='Dozen'>Dozen</option>
                  </select>
                </div>
              </motion.div>
            </motion.div>

            <motion.div className=' space-y-3 shadow-xl rounded-lg border border-gray-300 p-4'>
              <div className=' flex gap-2 justify-center items-center'>
                <div className='flex-[2]'>
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
                    placeholder='Price'
                    required
                    min='0'
                    step='0.01'
                    value={price}
                    onChange={e => {
                      prizeOnChange(e.target.value, 0)
                    }}
                    className='mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
                  />
                </div>
                <div className='flex-[1] '>
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
                    className='mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-1'
                  >
                    <option value='' disabled selected>
                      Select
                    </option>
                    <option value='Item'>Per Item</option>
                    <option value='Kg'>Per Kg</option>
                    <option value='100Kg'>Per Quintal(100Kg)</option>
                    <option value='L'>Per Liter</option>
                    <option value='Box'>Per Box</option>
                    <option value='Dozen'>Per Dozen</option>
                  </select>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className=' flex gap-2 justify-center items-center'
              >
                <div className='flex-[2]'>
                  <label
                    htmlFor='discount'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Total Discount ( % )
                  </label>
                  <input
                    type='number'
                    id='discount '
                    name='discount'
                    value={discount}
                    onChange={e => {
                      SetDiscount(e.target.value)
                      prizeOnChange(price, e.target.value)
                    }}
                    placeholder='Discount ( eg 10, 20, 30, etc )'
                    required
                    min='0'
                    className='mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:ring focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
                  />
                </div>
              </motion.div>

              {/* prize deduction display */}
              <div className='min-w-full mx-auto px-8 py-2 bg-white shadow-lg rounded-lg border border-gray-200 mt-4'>
                <h2 className='text-xl font-semibold text-gray-900 text-center mb-4'>
                  Final Payout Breakdown
                </h2>
                <div className='space-y-2'>
                  <div className='flex justify-between text-gray-700'>
                    <span>Original Price</span>
                    <span className='font-semibold'>
                      ₹ {parseFloat(price).toFixed(2)}
                    </span>
                  </div>
                  <div className='flex justify-between text-gray-700'>
                    <span>Discounted Price</span>
                    <span className='font-semibold'>
                      ₹{' '}
                      {parseFloat((price * (100 - discount)) / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className='flex justify-between text-gray-700'>
                    <span>Platform Fee (10%)</span>
                    <span className='font-semibold'>
                      ₹ {finalPayout.platformFee}
                    </span>
                  </div>
                  <div className='flex justify-between text-gray-700'>
                    <span>Payment Fee (2%)</span>
                    <span className='font-semibold'>
                      ₹ {finalPayout.paymentFee}
                    </span>
                  </div>
                  <div className='flex justify-between text-gray-700'>
                    <span>GST on Platform Fee (18%)</span>
                    <span className='font-semibold'>
                      ₹ {finalPayout.gstOnPlatformFee}
                    </span>
                  </div>
                  <div className='flex justify-between text-gray-800 border-t pt-2'>
                    <span className='font-medium'>Total Deduction</span>
                    <span className='font-semibold text-red-500'>
                      ₹ {finalPayout.totalDeduction}
                    </span>
                  </div>
                  <div className='flex justify-between text-gray-800 border-t pt-2'>
                    <span className='font-medium'>You Receives</span>
                    <span className='font-semibold text-green-500'>
                      ₹ {finalPayout.vendorReceives}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div className='space-y-3 shadow-xl rounded-lg border border-gray-300 p-4'>
            <div>
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
                className='mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out px-4 py-2'
              ></textarea>
            </div>

            <motion.div className='space-y-2'>
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
                transition duration-150 ease-in-out h-12 border border-dashed border-gray-400 rounded-full p-1'
              />
            </motion.div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <motion.div className='space-y-2'>
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
                  className='mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
                  onChange={e => setSelectedCountry(e.target.value)}
                  value={selectedCountry}
                >
                  <option value='' disabled selected>
                    Select country
                  </option>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </motion.div>
              <motion.div className='space-y-2'>
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
                  className='mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
                  onChange={e => setSelectedState(e.target.value)}
                  value={selectedState}
                >
                  <option value='' disabled selected>
                    Select state
                  </option>
                  {selectedCountry &&
                    states.map(state => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>
              </motion.div>
              <motion.div className='space-y-2'>
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
                  className='mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out h-12 px-4'
                >
                  <option value='' disabled selected>
                    Select city
                  </option>
                  {selectedState &&
                    cities[selectedState].map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </motion.div>
            </div>
          </motion.div>

          <motion.button
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
