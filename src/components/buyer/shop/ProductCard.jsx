import React from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, MapPin, Clock } from 'lucide-react'

const ProductCard = ({ product }) => {
  // const isChickenImage = product.image.includes(
  //   'chicken-chefkok-whole-deheus-kidzz.png'
  // )

  return (
    <motion.div
      className='bg-white overflow-hidden border-2 border-gray-300'
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
    >
      <div className='relative pb-[75%] bg-gray-100'>
        <img
          src={product.image.imageUrl}
          alt={product.name}
          className={`absolute top-0 left-0 w-full h-full object-cover p-1`}
        />
        <motion.button
          className='absolute top-2 right-2 p-2 bg-white rounded-full text-gray-600 hover:text-red-500'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={20} />
        </motion.button>
        <div className='absolute bottom-2 left-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-700'>
          {product.category}
        </div>
      </div>
      <div className='p-4'>
        <div className='flex justify-between'>
          <h3 className='text-lg font-semibold text-gray-800 mb-2 truncate'>
            {product.name}
          </h3>
          <div className='flex items-center mb-2'>
            <div className='flex items-center'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i != product.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            {/* <span className='text-xs text-gray-600 ml-2'>
              ({product.reviews} reviews)
            </span> */}
          </div>
        </div>
        <p className='text-gray-600 text-xs mb-3 line-clamp-2'>
        {product.country}, {product.city}, {product.state}
        </p>
        {/* <div className='flex items-center text-xs text-gray-500 mb-1'>
          <MapPin size={12} className='mr-1' />
          {product.village}, {product.district}, {product.state}
        </div> */}
        <div className='flex items-center text-xs text-gray-500 mb-3'>
          <Clock size={12} className='mr-1' />
          {product.status}
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-bold text-gray-800'>
            ${product.price.toFixed(2)}
          </span>
          <motion.button
            className='flex items-center justify-center bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 text-sm'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={16} className='mr-1' />
            Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
