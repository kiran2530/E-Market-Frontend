import React, { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import alertContext from '../../../context/alert/alertContext'
import { useNavigate } from 'react-router-dom'

const backendUrl = import.meta.env.VITE_BACKEND_URL
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY

const CartItem = ({
  item,
  updateQuantity,
  removeItem,
  isRemoveCard,
  isAddCart
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className='flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0'
    >
      <motion.img
        src={item.productId.image.imageUrl}
        alt={item.productId.name}
        className='w-20 h-20 object-cover rounded-lg shadow-md'
        whileHover={{ scale: 1.05 }}
      />
      <div className='flex-1'>
        <h3 className='font-semibold text-lg'>{item.productId.name}</h3>
        <p className='text-sm text-gray-500'>
          ₹{item.productId.price.toFixed(2)} / {item.productId.priceCategory}
        </p>
      </div>
      <div className='flex items-center space-x-2'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 bg-gray-200 rounded-full ${
            isAddCart ? 'cursor-wait' : ''
          }`}
          onClick={() =>
            updateQuantity(
              item.productId._id,
              item._id,
              Math.max(1, item.quantity - 1),
              item.quantity
            )
          }
          disabled={isAddCart}
        >
          <Minus className='h-4 w-4 text-gray-600' />
        </motion.button>
        <input
          type='number'
          min='1'
          value={item.quantity}
          onChange={e =>
            updateQuantity(
              item.productId._id,
              item._id,
              parseInt(e.target.value) || 1,
              item.quantity
            )
          }
          className='p-1 w-12 text-center border border-gray-300 rounded-md'
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 bg-gray-200 rounded-full ${
            isAddCart ? 'cursor-wait' : ''
          }`}
          onClick={() =>
            updateQuantity(
              item.productId._id,
              item._id,
              item.quantity + 1,
              item.quantity
            )
          }
          disabled={isAddCart}
        >
          <Plus className='h-4 w-4 text-gray-600' />
        </motion.button>
      </div>
      <motion.button
        whileHover={{ scale: 1.1, color: '#EF4444' }}
        whileTap={{ scale: 0.9 }}
        className='p-2 bg-gray-100 rounded-full text-red-600 hover:text-red-400 transition-colors'
        onClick={() => removeItem(item._id, item.productId._id)}
        disabled={isRemoveCard}
      >
        {isRemoveCard ? (
          <motion.div
            className='w-6 h-6 border-t-2 border-black rounded-full animate-spin'
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ) : (
          <Trash2 className='h-5 w-5' />
        )}
      </motion.button>
    </motion.div>
  )
}

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [isRemoveCard, setIsRemoveCard] = useState(false)
  const [isAddCart, setIsAddCard] = useState(false)
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)

  const navigate = useNavigate()

  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  useEffect(() => {
    fetchCartItems()
  }, [])

  const fetchCartItems = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${backendUrl}/api/cart/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authToken: localStorage.getItem('authToken')
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetching cart items: ${response.statusText}`)
      }

      const data = await response.json()
      console.log(data.cart)

      setCartItems(data.cart)
    } catch (error) {
      showAlert('Error fetching cart items', 'danger')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (productId, quantity) => {
    setIsAddCard(true)
    try {
      const response = await fetch(`${backendUrl}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authToken: localStorage.getItem('authToken')
        },
        body: JSON.stringify({ productId, quantity })
      })

      if (!response.ok) {
        throw new Error(`Failed to add item: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        showAlert(data.message || 'Quantity Updated', 'success')
      } else {
        showAlert(data.message || 'Warning', 'warning')
      }
    } catch (error) {
      showAlert(error.message || 'Failed to add item to cart', 'danger')
    } finally {
      setIsAddCard(false)
    }
  }

  const updateQuantity = async (
    productId,
    itemId,
    newQuantity,
    oldQuantity
  ) => {
    await handleAddToCart(productId, newQuantity - oldQuantity)
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeFromCart = async productId => {
    setIsRemoveCard(true)
    try {
      const response = await fetch(`${backendUrl}/api/cart/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authToken: localStorage.getItem('authToken')
        },
        body: JSON.stringify({ productId })
      })

      if (!response.ok) {
        throw new Error(`Failed to add item: ${response.statusText}`)
      }

      const data = await response.json()

      showAlert(data.message, 'success')
    } catch (error) {
      showAlert(error.message || 'Failed to remove item from cart', 'danger')
    } finally {
      setIsRemoveCard(false)
    }
  }

  const removeItem = async (itemId, productId) => {
    const result = await removeFromCart(productId)
    setCartItems(prevItems => prevItems.filter(item => item._id !== itemId))
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    )
  }

  // load Razorpay Script
  const loadRazorpayScript = () => {
    return new Promise(resolve => {
      if (window.Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  // handle buy now
  const handleBuyNow = async () => {
    try {
      setIsPaymentProcessing(true)

      // Load Razorpay script
      const isRazorpayLoaded = await loadRazorpayScript()
      if (!isRazorpayLoaded) {
        showAlert('Razorpay SDK failed to load. Are you online?', 'danger')
        return
      }

      const formattedProducts = cartItems.map(item => ({
        productId: item.productId._id, // Use the correct product ID
        quantity: item.quantity,
        price: item.productId.price,
        vendorId: item.productId.vendorId
      }))

      const totalAmount = formattedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      // Step 1: Create order in backend
      const orderResponse = await fetch(`${backendUrl}/api/payment/buy-now`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authToken: localStorage.getItem('authToken')
        },
        body: JSON.stringify({
          buyerId: null,
          products: formattedProducts,
          totalAmount: totalAmount,
          shippingAddress: 'Shelewadi'
        })
      })

      const orderData = await orderResponse.json()
      if (!orderResponse.ok)
        throw new Error(orderData.message || 'Order creation failed!')

      // Step 2: Load Razorpay checkout
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: 'E-Market',
        description: `Purchase ${orderData._id}`,
        handler: async response => {
          try {
            // Step 3: Verify Payment
            const verifyResponse = await fetch(
              `${backendUrl}/api/payment/payment-success`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  authToken: localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                  ...response,
                  products: formattedProducts,
                  totalAmount: totalAmount,
                  shippingAddress: 'Shelewadi'
                })
              }
            )

            const verifyData = await verifyResponse.json()

            if (!verifyResponse.ok)
              throw new Error(
                verifyData.message || 'Payment verification failed!'
              )
            showAlert(verifyData.message, 'success')
            for (const product of formattedProducts) {
              try {
                let result = await removeFromCart(product.productId)
                console.log(result)
              } catch (error) {
                console.error('Error removing from cart:', error)
              }
            }
          } catch (error) {
            console.error('Payment verification failed:', error)

            showAlert('Payment verification failed!', 'danger')
          }
        },
        theme: { color: '#3399cc' }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Error in Buy Now:', error)
      showAlert(error.message || 'Something went wrong!', 'danger')
    } finally {
      setIsPaymentProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            times: [0, 0.5, 1],
            repeat: Infinity
          }}
        >
          <ShoppingBag className='w-12 h-12 text-primary' />
        </motion.div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex flex-col items-center justify-center h-64 space-y-4'
      >
        <ShoppingBag className='w-16 h-16 text-gray-400' />
        <h2 className='text-2xl font-semibold text-gray-700'>
          Your cart is empty
        </h2>
        <p className='text-gray-500'>
          Add some items to your cart to get started!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-primary-dark transition-colors duration-200'
          onClick={() => {
            navigate('/shop')
          }}
        >
          Continue Shopping
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className='max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-lg'>
      <motion.h1
        className='text-3xl font-bold mb-6 text-gray-800'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Cart
      </motion.h1>
      <AnimatePresence>
        {cartItems.map(item => (
          <CartItem
            key={item._id}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            isRemoveCard={isRemoveCard}
            isAddCart={isAddCart}
          />
        ))}
      </AnimatePresence>
      <motion.div
        className='mt-6 pt-6 border-t border-gray-200'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className='flex justify-between items-center font-semibold text-xl'>
          <span>Total:</span>
          <span>₹{calculateTotal().toFixed(2)}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center'
          onClick={handleBuyNow}
        >
          {isPaymentProcessing ? (
            <motion.div
              className='w-6 h-6 border-t-2 border-white rounded-full animate-spin'
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ) : (
            <>
              Proceed to Checkout
              <ArrowRight className='ml-2 h-5 w-5' />
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default Cart
