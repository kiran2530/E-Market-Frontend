import React from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock } from 'lucide-react'

const ProductCard = ({ product }) => {
  // const isChickenImage = product.image.includes(
  //   'chicken-chefkok-whole-deheus-kidzz.png'
  // )

  return (
    <motion.div
      className='bg-white rounded-lg shadow-md overflow-hidden'
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
    >
      <div className='relative pb-[75%] bg-gray-100'>
        <img
          src={product.image.imageUrl}
          alt={product.name}
          className={`absolute top-0 left-0 w-full h-full object-contain`}
        />
        <div className='absolute bottom-2 left-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-700'>
          {product.category}
        </div>
      </div>
      <div className='p-4'>
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
                  i < product.rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className='text-xs text-gray-600 ml-2'>
            ({product.reviews} reviews)
          </span>
        </div>
        <p className='text-gray-600 text-xs mb-3 line-clamp-2'>
          {product.description}
        </p>
        <div className='flex items-center text-xs text-gray-500 mb-1'>
          <MapPin size={12} className='mr-1' />
          {product.country}, {product.city}, {product.state}
        </div>
        <div className='flex items-center text-xs text-gray-500 mb-3'>
          <Clock size={12} className='mr-1' />
          Harvesting status: {product.harvestingStatus}
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-bold text-gray-800'>
            ${product.price.toFixed(2)}
          </span>
          
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
