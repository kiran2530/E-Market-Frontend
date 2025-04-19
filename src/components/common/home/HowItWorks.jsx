'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Search,
  ShoppingCart,
  CreditCard,
  Package,
  ThumbsUp
} from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { Float, Environment, Html } from '@react-three/drei'
import { useInView } from 'react-intersection-observer'

// Custom Badge Component
const Badge = ({ children, className = '' }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}
  >
    {children}
  </span>
)

const StepIcon3D = ({ icon, color, inView }) => {
  return (
    <Canvas className='h-24'>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Float
        speed={inView ? 2 : 0}
        rotationIntensity={inView ? 0.5 : 0}
        floatIntensity={inView ? 0.5 : 0}
      >
        <Html
          transform
          distanceFactor={10}
          position={[0, 0, 0]}
          className='pointer-events-none'
        >
          <div
            className={`flex items-center justify-center w-56 h-56 rounded-full ${color} text-white`}
          >
            {icon}
          </div>
        </Html>
      </Float>
      <Environment preset='city' />
    </Canvas>
  )
}

function HowItWorks () {
  const { scrollYProgress } = useScroll()
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const steps = [
    {
      icon: <Search className='w-40 h-40' />,
      title: 'Browse Products',
      description: 'Search through thousands of products from various vendors.',
      color: 'bg-indigo-600'
    },
    {
      icon: <ShoppingCart className='w-40 h-40' />,
      title: 'Add to Cart',
      description:
        'Select the items you want and add them to your shopping cart.',
      color: 'bg-blue-600'
    },
    {
      icon: <CreditCard className='w-40 h-40' />,
      title: 'Secure Checkout',
      description: 'Complete your purchase with our secure payment options.',
      color: 'bg-purple-600'
    },
    {
      icon: <Package className='w-40 h-40' />,
      title: 'Fast Delivery',
      description:
        'Receive your items quickly with our efficient shipping partners.',
      color: 'bg-green-600'
    },
    {
      icon: <ThumbsUp className='w-40 h-40' />,
      title: 'Enjoy & Review',
      description: 'Enjoy your purchase and share your experience with others.',
      color: 'bg-orange-600'
    }
  ]

  const stepRefs = steps.map(() => useRef(null))
  const inViewStates = steps.map(() => useRef(false))

  steps.forEach((step, index) => {
    const [ref, inView] = useInView({
      triggerOnce: false,
      threshold: 0.1
    })

    stepRefs[index].current = ref
    inViewStates[index].current = inView
  })

  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
      <div className='text-center mb-16'>
        <Badge className='mb-4 px-3 py-1 bg-green-100 text-green-800'>
          Simple Process
        </Badge>
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>How It Works</h2>
        <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
          Our platform makes shopping and selling easy with a straightforward
          process
        </p>
      </div>

      <div className='relative'>
        {/* Connection Line with animation */}
        <div className='absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 hidden md:block'>
          <motion.div
            className='h-full bg-blue-600'
            style={{ width: lineWidth }}
          ></motion.div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
          {steps.map((step, index) => {
            const inView = inViewStates[index].current
            const ref = stepRefs[index].current

            return (
              <motion.div
                ref={ref}
                key={index}
                className='flex flex-col items-center text-center relative z-10'
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className='h-24 w-24 mb-4 bg-white p-4 rounded-full flex items-center justify-center'>
                  <StepIcon3D
                    icon={step.icon}
                    color={step.color}
                    inView={inView}
                  />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  {step.title}
                </h3>
                <p className='text-gray-600'>{step.description}</p>

                {/* Step Number */}
                <div className='absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full border-2 border-indigo-600 flex items-center justify-center text-sm font-bold text-indigo-600'>
                  {index + 1}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
