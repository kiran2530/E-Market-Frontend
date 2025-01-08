import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag,
  Search,
  Truck,
  CreditCard,
  Users,
  TrendingUp,
  Shield,
  Store,
  Gift,
  ThumbsUp,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import HowItWorks from './HowItWorks'
import { Link } from 'react-router-dom'

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const [openFAQ, setOpenFAQ] = useState(null)

  const toggleFAQ = index => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const features = [
    {
      icon: <Search className='w-12 h-12 text-blue-600' />,
      title: 'Smart Search',
      description:
        "Find exactly what you're looking for with our advanced search and filtering options.",
      forBuyer: true
    },
    {
      icon: <Store className='w-12 h-12 text-green-600' />,
      title: 'Easy Store Setup',
      description:
        'Vendors can set up their online store quickly and start selling in minutes.',
      forVendor: true
    },
    {
      icon: <Truck className='w-12 h-12 text-blue-600' />,
      title: 'Fast Shipping',
      description:
        'Enjoy quick delivery options and real-time tracking for your orders.',
      forBuyer: true
    },
    {
      icon: <ShoppingBag className='w-12 h-12 text-green-600' />,
      title: 'Inventory Management',
      description:
        'Efficiently manage your product inventory with our intuitive tools.',
      forVendor: true
    },
    {
      icon: <CreditCard className='w-12 h-12 text-blue-600' />,
      title: 'Secure Payments',
      description:
        'Shop with confidence using our secure and diverse payment options.',
      forBuyer: true
    },
    {
      icon: <TrendingUp className='w-12 h-12 text-green-600' />,
      title: 'Sales Analytics',
      description:
        'Gain valuable insights into your sales performance and customer behavior.',
      forVendor: true
    },
    {
      icon: <Gift className='w-12 h-12 text-blue-600' />,
      title: 'Rewards Program',
      description:
        'Earn points on your purchases and enjoy exclusive discounts.',
      forBuyer: true
    },
    {
      icon: <Shield className='w-12 h-12 text-green-600' />,
      title: 'Seller Protection',
      description:
        'Benefit from our robust seller protection policies and support.',
      forVendor: true
    },
    {
      icon: <Users className='w-12 h-12 text-gray-600' />,
      title: 'Community',
      description:
        'Join a thriving community of buyers and sellers, share experiences, and grow together.',
      forBoth: true
    }
  ]

  const faqs = [
    {
      question: 'How do I create an account?',
      answer:
        "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill in your details, choose whether you're a buyer or a vendor, and follow the prompts to complete your registration."
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept a wide range of payment methods including credit/debit cards, PayPal, Apple Pay, and Google Pay. Specific payment options may vary depending on your location.'
    },
    {
      question: 'How can I become a vendor?',
      answer:
        'To become a vendor, sign up for a vendor account and complete the verification process. Once approved, you can set up your store, list products, and start selling.'
    },
    {
      question: 'What are the shipping options and costs?',
      answer:
        'Shipping options and costs vary depending on the product, vendor, and your location. You can view specific shipping details on each product page before making a purchase.'
    },
    {
      question: 'How does the rewards program work?',
      answer:
        'Our rewards program allows buyers to earn points on every purchase. These points can be redeemed for discounts on future purchases. The more you shop, the more you save!'
    },
    {
      question: 'What kind of support do you offer to vendors?',
      answer:
        'We offer comprehensive support to vendors, including inventory management tools, analytics dashboards, marketing assistance, and dedicated customer service. We also provide resources and guides to help you grow your business.'
    }
  ]

  const userReviews = [
    {
      name: 'Sarah Johnson',
      role: 'Buyer',
      quote:
        'I love the wide variety of products available. The rewards program is a great bonus, and the shipping is always fast!'
    },
    {
      name: 'Michael Chen',
      role: 'Vendor',
      quote:
        'This platform has transformed my small business. The sales analytics and inventory management tools are game-changers.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Buyer',
      quote:
        "The smart search feature helps me find exactly what I'm looking for. Plus, the secure payment options give me peace of mind."
    },
    {
      name: 'David Lee',
      role: 'Vendor',
      quote:
        'Setting up my store was a breeze. The seller protection policies make me feel secure in my transactions.'
    },
    {
      name: 'Lisa Thompson',
      role: 'Buyer',
      quote:
        'The community aspect is great. I love reading reviews and interacting with sellers directly.'
    },
    {
      name: 'Alex Patel',
      role: 'Vendor',
      quote:
        "The platform's marketing tools have helped me reach more customers than ever before. My sales have doubled!"
    }
  ]

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className="h-auto py-20 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto bg-[url('https://img.freepik.com/premium-photo/pair-scissors-with-scissor-background_943617-75822.jpg?w=1380')] bg-cover bg-center">
        <div className='text-center xl:mb-10'>
          <motion.h1
            className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 xl:mb-10'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your One-Stop E-Commerce Destination
          </motion.h1>
          <motion.p
            className='max-w-xl mx-auto text-xl text-gray-600 mb-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Whether you're here to shop or sell, our platform offers a seamless
            experience for both buyers and vendors.
          </motion.p>
          <motion.div
            className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 xl:mt-20'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <a
              href='#features'
              className='bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-900 transition duration-300'
            >
              Explore Features
            </a>
            <Link
              to='/shop'
              className='bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition duration-300'
            >
              Start Shopping
            </Link>
            <Link
              to='/about'
              className='bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300'
            >
              About Us
            </Link>
            {/* <Link
              to='/'
              className='bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300'
            >
              Become a Vendor
            </Link> */}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id='features'
        className='py-20 px-4 sm:px-20 lg:px-40 max-w-8xl mx-auto bg-white'
      >
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Platform Features
          </h2>
          <p className='text-xl text-gray-600'>
            Discover what makes our platform great for both buyers and sellers.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((item, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-lg ${
                item.forBuyer
                  ? 'bg-blue-50'
                  : item.forVendor
                  ? 'bg-green-50'
                  : 'bg-gray-50'
              }`}
              variants={fadeInUp}
              initial='initial'
              whileInView='animate'
              viewport={{ once: true }}
            >
              <div className='flex justify-center mb-4'>{item.icon}</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                {item.title}
              </h3>
              <p className='text-gray-600'>{item.description}</p>
              {item.forBuyer && (
                <span className='inline-block mt-2 text-blue-600 font-semibold'>
                  For Buyers
                </span>
              )}
              {item.forVendor && (
                <span className='inline-block mt-2 text-green-600 font-semibold'>
                  For Vendors
                </span>
              )}
              {item.forBoth && (
                <span className='inline-block mt-2 text-gray-600 font-semibold'>
                  For Everyone
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Powerful Features Section */}
      <section
        id='features'
        className='py-20 px-4 sm:px-20 lg:px-30 max-w-8xl mx-auto bg-gray-200'
      >
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Powerful Features for Your Success
          </h2>
          <p className='text-xl text-gray-600'>
            Our platform is packed with tools to help you grow your online
            business.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
          <motion.div
            className='flex flex-col items-center text-center'
            variants={fadeInUp}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
          >
            <TrendingUp className='w-16 h-16 text-purple-600 mb-4' />
            <h3 className='text-2xl font-semibold text-gray-900 mb-2'>
              Market Prediction
            </h3>
            <p className='text-gray-600 mb-4'>
              Leverage AI-powered market analysis to predict trends and optimize
              your inventory.
            </p>
            <ul className='text-left text-gray-600 sm:px-10'>
              <li className='mb-2'>
                • Trend forecasting based on historical data
              </li>
              <li className='mb-2'>
                • Demand prediction for efficient stock management
              </li>
              <li>• Competitive pricing suggestions</li>
            </ul>
          </motion.div>
          <motion.div
            className='flex flex-col items-center text-center'
            variants={fadeInUp}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
          >
            <Shield className='w-16 h-16 text-purple-600 mb-4' />
            <h3 className='text-2xl font-semibold text-gray-900 mb-2'>
              Customizable Storefronts
            </h3>
            <p className='text-gray-600 mb-4'>
              Create a unique online presence with our customizable storefront
              templates.
            </p>
            <ul className='text-left text-gray-600'>
              <li className='mb-2'>• Mobile-responsive designs</li>
              <li className='mb-2'>• Easy-to-use drag-and-drop editor</li>
              <li>• SEO optimization tools</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <section className='py-20 px-4 sm:px-20 lg:px-40 max-w-8xl mx-auto bg-gray-200'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            What Our Users Say
          </h2>
          <p className='text-xl text-gray-600'>
            Hear from our satisfied buyers and successful vendors
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {userReviews.map((testimonial, index) => (
            <motion.div
              key={index}
              className='bg-white p-6 rounded-lg shadow-md'
              variants={fadeInUp}
              initial='initial'
              whileInView='animate'
              viewport={{ once: true }}
            >
              <p className='text-gray-600 italic mb-4'>"{testimonial.quote}"</p>
              <p className='font-semibold text-gray-900'>{testimonial.name}</p>
              <p
                className={`${
                  testimonial.role === 'Buyer'
                    ? 'text-blue-600'
                    : 'text-green-600'
                } font-medium`}
              >
                {testimonial.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-20 px-4 sm:px-20 lg:px-40 max-w-8xl mx-auto bg-white'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Frequently Asked Questions
          </h2>
          <p className='text-xl text-gray-600'>
            Find answers to common questions about our platform
          </p>
        </div>
        <div className='max-w-3xl mx-auto'>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className='mb-4 border-b border-gray-200 pb-4'
              initial='initial'
              animate='animate'
              variants={fadeInUp}
            >
              <button
                className='flex justify-between items-center w-full text-left'
                onClick={() => toggleFAQ(index)}
              >
                <span className='text-lg font-semibold text-gray-900'>
                  {faq.question}
                </span>
                {openFAQ === index ? (
                  <ChevronUp className='w-5 h-5 text-gray-500' />
                ) : (
                  <ChevronDown className='w-5 h-5 text-gray-500' />
                )}
              </button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className='mt-2 text-gray-600'
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center'>
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>
          Ready to Get Started?
        </h2>
        <p className='text-xl text-gray-600 mb-8'>
          Join our thriving e-commerce community today!
        </p>
        <motion.div
          className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to='/shop'
            className='bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300'
          >
            Start Shopping
          </Link>
          <Link
            to='/'
            className='bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300'
          >
            Become a Vendor
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
