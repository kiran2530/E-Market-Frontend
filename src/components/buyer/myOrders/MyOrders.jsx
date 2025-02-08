import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package,
  ChevronDown,
  ChevronUp,
  Truck,
  DollarSign,
  Calendar
} from 'lucide-react'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const statusColors = {
    Processing: 'bg-yellow-100 text-yellow-800',
    Shipped: 'bg-blue-100 text-blue-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800'
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className='bg-white rounded-lg shadow-md overflow-hidden mb-4'
    >
      <div className='p-4'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='text-lg font-semibold'>
            Order #{order._id.slice(-6)}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              statusColors[order.status]
            }`}
          >
            {order.status}
          </span>
        </div>
        <div className='flex justify-between items-center mb-2'>
          <div className='flex items-center'>
            <Calendar className='w-4 h-4 mr-1 text-gray-500' />
            <span className='text-sm text-gray-600'>
              {new Date(order.orderDate).toLocaleDateString()}
            </span>
          </div>
          <div className='flex items-center'>
            <span className='text-sm font-semibold'>
              ₹ {order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
        <div className='flex items-center text-sm text-gray-600 mb-2'>
          <Truck className='w-4 h-4 mr-1' />
          <span>{order.shippingAddress}</span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-gray-600'>
            Vendor: {order.vendorId.name}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center'
          >
            {isExpanded ? (
              <>
                <span className='mr-1'>Less details</span>
                <ChevronUp className='w-4 h-4' />
              </>
            ) : (
              <>
                <span className='mr-1'>More details</span>
                <ChevronDown className='w-4 h-4' />
              </>
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='px-4 pb-4'
          >
            <h4 className='font-semibold mb-2'>Products:</h4>
            <ul className='space-y-2'>
              {order.products.map(product => (
                <li key={product._id} className='flex items-center'>
                  <img
                    src={product.productId.image.imageUrl || '/placeholder.svg'}
                    alt={product.productId.name}
                    className='w-12 h-12 object-cover rounded-md mr-3'
                  />
                  <div>
                    <p className='font-semibold'>{product.productId.name}</p>
                    <p className='text-sm text-gray-600'>
                      Quantity: {product.quantity} x ₹ {product.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulating API call to fetch orders
    const fetchOrders = async () => {
      setIsLoading(true)
      try {
        // Replace this with your actual API call
        const response = await fetch(`${backendUrl}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authToken: localStorage.getItem('authToken')
          }
        })

        const result = await response.json()

        setOrders(result)
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className='w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full'
        />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-8'>Your Orders</h1>
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white rounded-lg shadow-md p-6 text-center'
          >
            <Package className='w-16 h-16 text-gray-400 mx-auto mb-4' />
            <p className='text-xl text-gray-600'>
              You haven't placed any orders yet.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {orders.map(order => (
              <OrderCard key={order._id} order={order} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Orders
