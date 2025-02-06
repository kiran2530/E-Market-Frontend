import React from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingBag,
  Store,
  Truck,
  CreditCard,
  Package,
  BarChart
} from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: <ShoppingBag />,
      title: 'Browse Products',
      description: 'Explore our wide range of products from various vendors.',
      forBuyer: true
    },
    {
      icon: <Store />,
      title: 'Set Up Shop',
      description: 'Create your vendor profile and list your products.',
      forVendor: true
    },
    {
      icon: <CreditCard />,
      title: 'Secure Purchase',
      description: 'Add items to cart and checkout securely.',
      forBuyer: true
    },
    {
      icon: <Package />,
      title: 'Process Orders',
      description: 'Receive and process customer orders efficiently.',
      forVendor: true
    },
    {
      icon: <Truck />,
      title: 'Fast Delivery',
      description: 'Receive your order at your doorstep.',
      forBuyer: true
    },
    {
      icon: <BarChart />,
      title: 'Grow Business',
      description: 'Analyze sales data and expand your reach.',
      forVendor: true
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <section className='py-20 px-4 sm:px-20 lg:px-40 max-w-8xl mx-auto bg-white'>
      <div className='text-center mb-16'>
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>How It Works</h2>
        <p className='text-xl text-gray-600'>
          Simple steps to start buying or selling on our platform
        </p>
      </div>
      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-80 sm:gap-40'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <div className='space-y-12'>
          <h3 className='text-2xl font-semibold text-blue-600 mb-6'>
            For Buyers
          </h3>
          {steps // it is an array of data..
            .filter(step => step.forBuyer) 
            .map((step, index) => (
              <motion.div
                key={index}
                className='flex items-start space-x-4'
                variants={itemVariants}
              >
                <div className='flex-shrink-0'>
                  <motion.div
                    className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                <div>
                  <h4 className='text-lg font-semibold text-gray-900 mb-1'>
                    {step.title}
                  </h4>
                  <p className='text-gray-600'>{step.description}</p>
                </div>
              </motion.div>
            ))}
        </div>
        <div className='space-y-12'>
          <h3 className='text-2xl font-semibold text-green-600 mb-6'>
            For Vendors
          </h3>
          {steps
            .filter(step => step.forVendor)
            .map((step, index) => (
              <motion.div
                key={index}
                className='flex items-start space-x-4'
                variants={itemVariants}
              >
                <div className='flex-shrink-0'>
                  <motion.div
                    className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                <div>
                  <h4 className='text-lg font-semibold text-gray-900 mb-1'>
                    {step.title}
                  </h4>
                  <p className='text-gray-600'>{step.description}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </section>
  )
}

export default HowItWorks
