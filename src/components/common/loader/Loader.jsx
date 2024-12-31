import React from 'react'
import { motion } from 'framer-motion'

import styles from './Loader.module.css'

const Loader = () => {
  return (
    <motion.div
      className='w-6 h-6 border-t-2 border-white rounded-full animate-spin'
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  )
}

export default Loader
