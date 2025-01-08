import React from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ChevronDown } from 'lucide-react'

const ProductSkeleton = () => {
  return (
    <>
      <div className='flex justify-between items-start z-10 w-full fixed pl-2 pr-1 py-1 bg-white bg-opacity-30 backdrop-blur-md'>
        <div className='w-56 sm:w-72'>
          <div className='relative'>
            <div className='w-full h-10 bg-gray-300 rounded-full animate-pulse'></div>
            <Search
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
          </div>
        </div>
        <div className='w-auto relative'>
          <div className='w-24 h-10 bg-gray-300 rounded-md animate-pulse flex items-center justify-center'>
            <Filter className='mr-2 text-gray-400' size={20} />
            <ChevronDown className='ml-2 text-gray-400' size={20} />
          </div>
        </div>
      </div>
      <div className='px-1 sm:px-2 py-2 mt-12'>
        <motion.div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2'>
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className='bg-white shadow-md overflow-hidden border border-gray-300'
            >
              <div className='w-full h-40 bg-gray-300 animate-pulse'></div>
              <div className='p-4 space-y-2'>
                <div className='w-3/4 h-4 bg-gray-300 rounded animate-pulse'></div>
                <div className='w-1/2 h-4 bg-gray-300 rounded animate-pulse'></div>
                <div className='w-1/4 h-4 bg-gray-300 rounded animate-pulse'></div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  )
}

export default ProductSkeleton
