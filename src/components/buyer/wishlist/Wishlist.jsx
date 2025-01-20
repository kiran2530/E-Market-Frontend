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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -1, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      className='bg-white overflow-hidden border-2 border-gray-300'
    >
      <div className='relative pb-[75%] bg-gray-100'>
        <img
          src={item.image.imageUrl}
          alt={item.name}
          className='absolute top-0 left-0 w-full h-full object-cover p-1'
        />
      </div>
      <div className=''>
        <div className='mt-1 flex flex-row justify-between mx-1'>
          <div className='ml-1 font-semibold text-lg'>
            <h3 className=''>{item.name}</h3>
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='mr-2 hover:text-blue-500'
              onClick={() => addToCart(item)}
            >
              <ShoppingCart className='w-6 h-6' />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='hover:text-red-500'
              onClick={() => removeFromWishlist(item._id)}
            >
              <Trash2 className='w-6 h-6' />
            </motion.button>
          </div>
        </div>
        <div className='px-2 mb-1'>
          <p className='text-sm'>
            ₹{item.price.toFixed(2)} / {item.priceCategory}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

const WishlistSkeleton = () => {
  return (
    <div className='bg-white shadow-lg overflow-hidden animate-pulse'>
      <div className='w-full h-64 bg-gray-300'></div>
    </div>
  )
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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

      showAlert('Product removed from the wishlist', 'success')

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

      const data = await response.json()
      console.log(data)

      // showAlert('Product added to cart', 'success')
      showAlert(data.message, 'success')
    } catch (error) {
      showAlert('Failed to add item to cart', 'danger')
      console.error('Error adding item to cart:', error)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-2 px-2 sm:px-6 lg:px-8'>
      <div className='max-w-8xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex items-center justify-center mb-8'
        >
          <h1 className='text-4xl font-bold text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 p-1'>
            My Wishlist
          </h1>
        </motion.div>

        {loading ? (
          <div className='grid gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
              <WishlistSkeleton key={item} />
            ))}
          </div>
        ) : wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
            transition={{ duration: 0.5 }}
            className='grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'
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
