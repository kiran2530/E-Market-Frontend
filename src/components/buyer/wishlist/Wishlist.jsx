import React, { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Trash2, ChevronLeft, Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import alertContext from '../../../context/alert/alertContext'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const WishlistItem = ({ item, removeFromWishlist, addToCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className='bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl'
    >
      <div className='relative group'>
        <img
          src={item.image.imageUrl}
          alt={item.name}
          className='w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='p-3 bg-white rounded-full shadow-md text-red-500 hover:text-red-600 transition-colors duration-300 mr-4'
            onClick={() => removeFromWishlist(item._id)}
          >
            <Trash2 className='w-6 h-6' />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='p-3 bg-blue-500 rounded-full shadow-md text-white hover:bg-blue-600 transition-colors duration-300'
            onClick={() => addToCart(item)}
          >
            <ShoppingCart className='w-6 h-6' />
          </motion.button>
        </div>
      </div>
      <div className='p-6'>
        <h3 className='text-xl font-semibold mb-2 text-gray-800 line-clamp-2'>
          {item.name}
        </h3>
        <div className='flex justify-between items-center'>
          <p className='text-2xl font-bold text-blue-600'>
            ₹{item.price.toFixed(2)}
          </p>
          <span className='text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
            {item.priceCategory}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

const WishlistSkeleton = () => {
  return (
    <div className='bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse'>
      <div className='w-full h-64 bg-gray-300'></div>
      <div className='p-6'>
        <div className='h-6 bg-gray-300 rounded w-3/4 mb-2'></div>
        <div className='h-4 bg-gray-300 rounded w-1/2 mb-4'></div>
        <div className='flex justify-between items-center'>
          <div className='h-8 bg-gray-300 rounded w-1/3'></div>
          <div className='h-6 bg-gray-300 rounded-full w-1/4'></div>
        </div>
      </div>
    </div>
  )
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  useEffect(() => {
    fetchWishlistItems()
  }, [])

  const fetchWishlistItems = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${backendUrl}/api/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authToken: localStorage.getItem('authToken')
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist items')
      }

      const data = await response.json()
      setWishlistItems(data.data)
    } catch (error) {
      console.error('Error fetching wishlist items:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async productId => {
    try {
      const response = await fetch(
        `${backendUrl}/api/wishlist/remove/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            authToken: localStorage.getItem('authToken')
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to remove Product from wishlist')
      }

      showAlert('Product remove from the wishlist', 'success')

      setWishlistItems(prevItems =>
        prevItems.filter(item => item._id != productId)
      )
    } catch (error) {
      showAlert('Failed to remove Product from wishlist', 'danger')
      console.error('Error removing item from wishlist:', error)
    }
  }

  const addToCart = async item => {
    try {
      const response = await fetch(`${backendUrl}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authToken: localStorage.getItem('authToken')
        },
        body: JSON.stringify({ productId: item._id, quantity: 1 })
      })

      if (!response.ok) {
        throw new Error('Failed to add item to cart')
      }

      showAlert('Product Add to cart', 'success')

      // Optionally, you can remove the item from the wishlist after adding to cart
    //   removeFromWishlist(item._id)
    } catch (error) {
      showAlert('Failed to add item to cart', 'danger')
      console.error('Error adding item to cart:', error)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-between mb-12'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='text-blue-600 flex items-center font-medium text-lg'
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className='w-6 h-6 mr-1' />
            Back
          </motion.button>
          <h1 className='text-4xl font-bold text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600'>
            My Wishlist
          </h1>
          <div className='w-24'></div> {/* Spacer for centering */}
        </div>

        {loading ? (
          <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <WishlistSkeleton key={item} />
            ))}
          </div>
        ) : wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl p-12 text-center max-w-lg mx-auto'
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className='w-24 h-24 text-red-400 mx-auto mb-8' />
            </motion.div>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Your wishlist is empty
            </h2>
            <p className='text-xl text-gray-600 mb-8'>
              Discover amazing products and add them to your wishlist!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:from-blue-600 hover:to-purple-600'
              onClick={() => navigate('/shop')}
            >
              Explore Products
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          >
            <AnimatePresence>
              {wishlistItems.map(item => (
                <WishlistItem
                  key={item._id}
                  item={item}
                  removeFromWishlist={removeFromWishlist}
                  addToCart={addToCart}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
