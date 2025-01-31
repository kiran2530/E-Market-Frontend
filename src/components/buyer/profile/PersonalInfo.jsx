'use client'

import React, { useState, useContext, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag,
  Heart,
  CreditCard,
  ChevronRight,
  Bell,
  Search,
  Menu,
  User,
  Settings
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { BuyerContext } from '../../../context/buyer/BuyerContext'

const BuyerDashboard = () => {
  const { buyer, getBuyerData } = useContext(BuyerContext)

  useEffect(() => {
    getBuyerData()
  }, [])

  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    {
      title: 'Total Orders',
      value: buyer?.orders?.length || 0,
      icon: ShoppingBag,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      route: '/orders'
    },
    {
      title: 'Wishlist Items',
      value: buyer?.wishlist?.length || 0,
      icon: Heart,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      route: '/wishlist'
    },
    {
      title: 'Cart Items',
      value: buyer?.cart?.items.length || 0,
      icon: ShoppingBag,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      route: '/cart'
    },
    {
      title: 'Total Spent',
      value:
        buyer?.totalSpent != null ? `₹${buyer.totalSpent.toFixed(2)}` : '₹0.00',
      icon: CreditCard,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      route: '/totalSpent'
    }
  ]

  const recentOrders = [
    {
      id: 'ORD001',
      product: 'Wireless Earbuds',
      date: '2023-05-01',
      status: 'Delivered',
      amount: '₹2,999'
    },
    {
      id: 'ORD002',
      product: 'Smart Watch',
      date: '2023-05-15',
      status: 'In Transit',
      amount: '₹5,499'
    },
    {
      id: 'ORD003',
      product: 'Bluetooth Speaker',
      date: '2023-05-22',
      status: 'Processing',
      amount: '₹1,999'
    }
  ]

  const notifications = [
    {
      id: 1,
      message: 'Your order ORD001 has been delivered',
      date: '2023-05-02'
    },
    {
      id: 2,
      message: 'New items added to your wishlist are on sale!',
      date: '2023-05-18'
    },
    {
      id: 3,
      message: 'Limited time offer: 20% off on electronics',
      date: '2023-05-25'
    }
  ]

  if (!buyer) {
    // Show a loading state or fallback UI until `buyer` is populated
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <motion.div
          className='w-6 h-6 border-t-2 border-white rounded-full animate-spin'
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <header className='mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-4xl font-bold text-gray-900'>
                Welcome back, {buyer.name}!
              </h1>
              <p className='mt-2 text-lg text-gray-600'>
                Here's what's happening with your account today.
              </p>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='bg-white rounded-xl shadow-lg overflow-hidden'
            >
              <div className='p-6'>
                <div className='flex items-center'>
                  <div className={`${item.bgColor} rounded-full p-3`}>
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                  </div>
                  <div className='ml-5'>
                    <p className='text-sm font-medium text-gray-500'>
                      {item.title}
                    </p>
                    <p className='mt-1 text-3xl font-semibold text-gray-900'>
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
              <div className={`${item.bgColor} px-6 py-3`}>
                <Link
                  to={item.route}
                  className={`text-sm font-medium ${item.color} hover:underline`}
                >
                  View all
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden mb-8'>
          <div className='flex border-b border-gray-200'>
            {['overview', 'orders', 'notifications'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition duration-300`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className='p-6'>
            <AnimatePresence mode='wait'>
              {activeTab === 'overview' && (
                <motion.div
                  key='overview'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>
                    Account Information
                  </h3>
                  <dl className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2'>
                    <div>
                      <dt className='text-sm font-medium text-gray-500'>
                        Full name
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {buyer.name}
                      </dd>
                    </div>
                    <div>
                      <dt className='text-sm font-medium text-gray-500'>
                        Email address
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {buyer.email}
                      </dd>
                    </div>
                    <div>
                      <dt className='text-sm font-medium text-gray-500'>
                        Phone number
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {buyer.phone}
                      </dd>
                    </div>
                    <div>
                      <dt className='text-sm font-medium text-gray-500'>
                        Address
                      </dt>
                      <dd className='mt-1 text-sm text-gray-900'>
                        {buyer.address}
                      </dd>
                    </div>
                  </dl>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key='orders'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>
                    Recent Orders
                  </h3>
                  <ul className='divide-y divide-gray-200'>
                    {recentOrders.map(order => (
                      <li key={order.id} className='py-4'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <div className='flex-shrink-0'>
                              <ShoppingBag className='h-6 w-6 text-gray-400' />
                            </div>
                            <div className='ml-4'>
                              <p className='text-sm font-medium text-gray-900'>
                                {order.product}
                              </p>
                              <p className='text-sm text-gray-500'>
                                {order.id}
                              </p>
                            </div>
                          </div>
                          <div className='flex items-center'>
                            <p className='text-sm font-medium text-gray-900 mr-4'>
                              {order.amount}
                            </p>
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === 'Delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'In Transit'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  key='notifications'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>
                    Notifications
                  </h3>
                  <ul className='divide-y divide-gray-200'>
                    {notifications.map(notification => (
                      <li key={notification.id} className='py-4'>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0'>
                            <Bell className='h-6 w-6 text-indigo-500' />
                          </div>
                          <div className='ml-3'>
                            <p className='text-sm font-medium text-gray-900'>
                              {notification.message}
                            </p>
                            <p className='text-sm text-gray-500'>
                              {notification.date}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick actions */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
            Quick Actions
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              {
                title: 'View All Orders',
                icon: ShoppingBag,
                color: 'bg-purple-500'
              },
              { title: 'Manage Wishlist', icon: Heart, color: 'bg-pink-500' },
              { title: 'Edit Profile', icon: User, color: 'bg-blue-500' }
            ].map((action, index) => (
              <motion.div
                key={action.title}
                whileHover={{ scale: 1.05 }}
                className='bg-white overflow-hidden shadow-lg rounded-xl'
              >
                <div className='p-6'>
                  <div className='flex items-center'>
                    <div className={`${action.color} rounded-full p-3`}>
                      <action.icon className='h-6 w-6 text-white' />
                    </div>
                    <div className='ml-4'>
                      <h3 className='text-lg font-medium text-gray-900'>
                        {action.title}
                      </h3>
                      <p className='mt-1 text-sm text-gray-500'>
                        <a href='#' className='hover:underline'>
                          Go to {action.title.toLowerCase()}{' '}
                          <ChevronRight className='inline h-4 w-4' />
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyerDashboard
