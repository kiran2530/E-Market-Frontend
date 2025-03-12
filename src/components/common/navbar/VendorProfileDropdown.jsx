import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  ShoppingBag,
  Package,
  Store,
  BarChart2,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  Truck,
  DollarSign
} from 'lucide-react'

const VendorProfileDropdown = ({ vendor, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: Store, label: 'Shop Info', path: '/dashboard/profile/info' },
    { icon: Package, label: 'My Products', path: 'dashboard/products' },
    { icon: Plus, label: 'Add Product', path: 'dashboard/add-product' },
    { icon: ShoppingBag, label: 'Orders', path: '/dashboard/orders' },
    { icon: Truck, label: 'Deliveries', path: '/dashboard/deliveries' },
    { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: DollarSign, label: 'Earnings', path: '/dashboard/earnings' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' }
  ]

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className='text-xs font-semibold flex flex-col items-center'>
        <User size={20} />
        <span>Vendor</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className='absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50'
            onClick={() => setIsOpen(false)}
          >
            {/* Vendor Info Section */}
            <div className='p-4 border-b border-gray-100 bg-blue-50'>
              <h3 className='font-medium text-blue-900'>
                {vendor?.shopName || 'My Shop'}
              </h3>
              <p className='text-sm text-blue-700'>
                {vendor?.name || 'Vendor'}
              </p>
              {vendor?.phone && (
                <p className='text-sm text-blue-600'>{vendor.phone}</p>
              )}
            </div>

            {/* Quick Stats */}
            <div className='grid grid-cols-2 gap-2 p-2 bg-gray-50 border-b border-gray-100'>
              <div className='text-center p-2'>
                <p className='text-xs text-gray-500'>Total Products</p>
                <p className='font-semibold text-blue-600'>
                  {vendor?.products?.length || 0}
                </p>
              </div>
              <div className='text-center p-2'>
                <p className='text-xs text-gray-500'>Pending Orders</p>
                <p className='font-semibold text-blue-600'>
                  {vendor?.pendingOrders || 0}
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <div className='py-2'>
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className='flex items-center justify-between px-4 py-2 hover:bg-blue-50 transition-colors duration-200'
                >
                  <div className='flex items-center space-x-3'>
                    <item.icon className='w-5 h-5 text-blue-600' />
                    <span className='text-sm text-gray-700'>{item.label}</span>
                  </div>
                  <ChevronRight className='w-4 h-4 text-gray-400' />
                </Link>
              ))}

              {/* Logout Button */}
              <button
                className='w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 mt-2 border-t border-gray-100'
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

export default VendorProfileDropdown
