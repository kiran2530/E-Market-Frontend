import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center'
      >
        <ShoppingBag className='w-24 h-24 text-primary mx-auto mb-8' />
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>
          404 - Page Not Found
        </h1>
        <p className='text-xl text-gray-600 mb-8'>
          Oops! It seems like this product is out of stock.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to='/'
            className='inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition duration-300 ease-in-out'
          >
            <ArrowLeft className='w-5 h-5 mr-2' />
            Back to Shop
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='mt-12 text-gray-500'
      >
        <p>
          Lost? Try searching for what you need or check out our featured
          products.
        </p>
      </motion.div>
    </div>
  )
}

export default NotFound
