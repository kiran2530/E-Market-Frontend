import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Code, Users, Zap, Shield, Clock } from 'lucide-react'

const teamMembers = [
  {
    name: 'Kiran Nikam',
    role: 'Team Leader || Full Stack Developer',
    image:
      'https://res.cloudinary.com/dtyyhhrtx/image/upload/v1734503011/kiranProfile_mgw9sr.png'
  },
  {
    name: 'Vaishnavi Desai',
    role: 'Backend Developer',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Soniya Desai',
    role: 'UI/UX Designer',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Sanket Patil',
    role: 'Frontend Developer',
    image:
      'https://res.cloudinary.com/dtyyhhrtx/image/upload/v1734506278/WhatsApp_Image_2024-12-18_at_12.32.24_PM_rudwwe.jpg'
  },
  {
    name: 'Akhilesh Patil',
    role: 'Frontend Developer',
    image:
      'https://res.cloudinary.com/dtyyhhrtx/image/upload/v1734506246/WhatsApp_Image_2024-12-18_at_12.41.21_PM_qmsgsc.jpg'
  }
]

const companyValues = [
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Constantly pushing the boundaries of e-commerce technology'
  },
  {
    icon: Users,
    title: 'Customer-Centric',
    description: 'Putting our users first in every decision we make'
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Ensuring the highest level of data protection for our clients'
  },
  {
    icon: Clock,
    title: 'Efficiency',
    description: 'Streamlining processes for faster, smoother transactions'
  }
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function About () {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-6 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-12'
        >
          E-Market
        </motion.h1>

        <motion.section {...fadeInUp} className='mb-16'>
          <h2 className='text-3xl font-bold text-gray-800 dark:text-white mb-4'>
            Our Story
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            e-market was founded in 2024 with a vision to revolutionize the
            online shopping experience. Our team of five passionate developers
            came together to create a platform that combines cutting-edge
            technology with user-friendly design, making e-commerce accessible
            and enjoyable for everyone.
          </p>
        </motion.section>

        <motion.section {...fadeInUp} className='mb-16'>
          <h2 className='text-3xl font-bold text-gray-800 dark:text-white mb-4'>
            Our Values
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                className='bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <value.icon className='w-12 h-12 text-blue-500 mb-4' />
                <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-2'>
                  {value.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-300'>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeInUp} className='mb-16'>
          <h2 className='text-3xl font-bold text-gray-800 dark:text-white mb-4 '>
            Our Team
          </h2>
          <div className='grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mx-5 sm:mx-0 '>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className='bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg py-4 px-4 w-60'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className='w-full h-48 object-contain'
                />
                <div className='p-4 text-center'>
                  <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>
                    {member.name}
                  </h3>
                  <p className='text-sm text-blue-600 dark:text-gray-300'>
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeInUp} className='text-center'>
          <h2 className='text-3xl font-bold text-gray-800 dark:text-white mb-4'>
            Join Our Journey
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 mb-8'>
            We're always looking for talented individuals to join our team and
            help us shape the future of e-commerce.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300'
          >
            View Career Opportunities
          </motion.button>
        </motion.section>
      </div>
    </div>
  )
}
