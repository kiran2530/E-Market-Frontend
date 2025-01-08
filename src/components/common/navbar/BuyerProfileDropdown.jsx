import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  ShoppingBag,
  Heart,
  Gift,
  Phone,
  CreditCard,
  Tag,
  MapPin,
  Edit,
  LogOut,
  ChevronRight,
  ShoppingCart
} from 'lucide-react'

const BuyerProfileDropdown = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: User, label: 'Personal Info', path: '/profile/info' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart' },
    { icon: ShoppingBag, label: 'Orders', path: '/orders' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: Edit, label: 'Edit Profile', path: '/profile/edit' }
  ]

  const toggleProfile = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative'>
      <button
        className='text-xs font-semibold flex flex-col items-center'
        onClick={toggleProfile}
      >
        <User size={20} />
        <span>Profile</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50'
          >
            {/* User Info Section */}
            <div className='p-4 border-b border-gray-100 flex items-center'>
              <Link
                to='/profile/info'
                className='flex items-center justify-between hover:bg-gray-50 transition-colors duration-200'
                onClick={toggleProfile}
              >
                <div>
                  <img
                    src='https://res.cloudinary.com/dtyyhhrtx/image/upload/v1734503011/kiranProfile_mgw9sr.png'
                    alt='profile'
                    className='w-10 rounded-full'
                  />
                </div>
                <div className='ml-3'>
                  <h3 className='font-medium'>{user?.name || 'Guest'}</h3>

                  {user?.phone && (
                    <p className='text-sm text-gray-500'>{user.phone}</p>
                  )}
                </div>
              </Link>
            </div>

            {/* Menu Items */}
            <div className='py-2'>
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className='flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors duration-200'
                  onClick={toggleProfile}
                >
                  <div className='flex items-center space-x-3'>
                    <item.icon className='w-5 h-5 text-gray-500' />
                    <span className='text-sm'>{item.label}</span>
                  </div>
                  <ChevronRight className='w-4 h-4 text-gray-400' />
                </Link>
              ))}

              {/* Logout Button */}
              <button
                className='w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-gray-50 transition-colors duration-200'
                onClick={() => {
                  handleLogout()
                }}
              >
                <LogOut className='w-5 h-5' />
                <span className='text-sm'>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BuyerProfileDropdown
