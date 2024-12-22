import React from 'react'
import { motion } from 'framer-motion'

const SkeletonLoader = ({ className }) => {
  return (
    <motion.div
      className={`bg-gray-300 rounded-md ${className}`}
      animate={{ opacity: [0.6, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default SkeletonLoader
