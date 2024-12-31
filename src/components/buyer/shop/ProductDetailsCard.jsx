import React, { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Info,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Tag,
  X
} from 'lucide-react'
import Loader from '../../common/loader/Loader'
import alertContext from '../../../context/alert/alertContext'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const ProductDetailsCard = () => {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isLoading, setLoading] = useState(false)
  const [isAddCart, setIsAddCard] = useState(false)
  const [product, setProduct] = useState({
    _id: { $oid: '676bad3d54ba27a6041673d4' },
    name: 'Sample Product',
    description: 'This is a sample product description.',
    price: 99,
    quantity: 100,
    category: 'Sample Category',
    subCategory: 'Sample Subcategory',
    image: {
      imageUrl:
        'https://res.cloudinary.com/dtyyhhrtx/image/upload/v1735109949/emarketproducts/xitucndskrlr0l0kf5dh.jpg',
      public_id: 'sampleproduct/sampleimage'
    },
    status: 'active',
    vendorId: { $oid: '676bacbd54ba27a6041673cf' },
    country: 'Sample Country',
    state: 'Sample State',
    city: 'Sample City',
    dateAdded: { $date: '2024-12-25T06:59:09.547Z' },
    __v: 0
  })

  const { productId } = useParams()

  const navigate = useNavigate()

  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `${backendUrl}/api/product/buyer/product/${productId}`
      )
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      showAlert('Error fetching product', 'danger')
      setProduct()
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
      console.log(data)
      showAlert('Item added to cart', 'success')
    } catch (error) {
      showAlert('Failed to add item to cart', 'danger')
    } finally {
      setIsAddCard(false)
    }
  }

  const incrementQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  const slideIn = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='bg-white shadow-lg rounded-lg overflow-hidden max-w-7xl mx-auto my-8 p-4 sm:p-6 lg:p-8 relative'>
          {/* <button
            onClick={() => {
              navigate('/shop')
            }}
            className='absolute p-1 rounded-full bg-gray-200 hover:bg-red-600 focus:outline-none top-4 right-4 z-10'
            aria-label='Close'
          >
            <X className='w-6 h-6 text-red-600 hover:text-gray-200' />
          </button> */}
          <div className='md:flex md:space-x-6'>
            {/* Product Image */}
            <motion.div
              className='md:w-1/2 mb-6 md:mb-0'
              initial='hidden'
              animate='visible'
              variants={fadeIn}
            >
              <img
                src={product.image.imageUrl}
                alt={product.name}
                className='w-full h-auto object-cover rounded-lg shadow-md'
              />
            </motion.div>

            {/* Product Details */}
            <motion.div
              className='md:w-1/2'
              initial='hidden'
              animate='visible'
              variants={slideIn}
            >
              <h2 className='text-3xl font-bold text-gray-800 mb-2'>
                {product.name}
              </h2>
              <div className='flex items-center mb-4'>
                <div className='flex items-center bg-green-500 text-white px-2 py-1 rounded'>
                  <span className='font-bold mr-1'>4.5</span>
                  <Star size={16} fill='white' />
                </div>
                <span className='text-gray-600 ml-2'>1,234 ratings</span>
              </div>

              <div className='mb-4'>
                <span className='text-4xl font-bold text-gray-800'>
                  ₹ {product.price.toFixed(2)}
                </span>
                <span className='text-xl text-gray-500 line-through ml-2'>
                  ₹{(product.price * 1.2).toFixed(2)}
                </span>
                <span className='text-green-500 ml-2 text-lg'>20% off</span>
              </div>

              <div className=' flex-wrap items-center mb-4 text-sm'>
                <div className='flex items-center mr-4 mb-2'>
                  <Tag className='mr-1 text-blue-500' size={18} />
                  <span className='font-semibold text-gray-700'>Category:</span>
                  <span className='ml-1'>
                    {product.category} / {product.subCategory}
                  </span>
                </div>
                <div className='flex items-center mr-4 mb-2'>
                  <Package className='mr-1 text-blue-500' size={18} />
                  <span className='font-semibold text-gray-700'>Quantity:</span>
                  <span className='ml-1'>
                    {product.quantity} {product.quantityCategory}
                  </span>
                </div>
                <div className='flex items-center mr-4 mb-2'>
                  <Info className='mr-1 text-blue-500' size={18} />
                  <span className='font-semibold text-gray-700'>Status:</span>
                  <span className='ml-1'>{product.status}</span>
                </div>
              </div>

              <div className='flex items-center mb-6'>
                <button
                  onClick={decrementQuantity}
                  className='bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-l transition duration-200'
                >
                  -
                </button>
                <span className='bg-gray-100 px-4 py-1'>{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className='bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-r transition duration-200'
                >
                  +
                </button>
              </div>

              <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-full font-semibold flex items-center justify-center transition duration-200'
                  onClick={e => {
                    e.stopPropagation()
                    // Add to cart logic here
                    handleAddToCart(product._id, quantity)
                  }}
                  disabled={isAddCart}
                >
                  {isAddCart ? (
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
                      <ShoppingCart size={20} className='mr-2' />
                      Add to Cart
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-semibold flex items-center justify-center transition duration-200'
                >
                  Buy Now
                </motion.button>
              </div>

              <div className='flex justify-between items-center text-gray-500 mb-6'>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className='flex items-center hover:text-red-500 transition duration-200'
                >
                  <Heart size={20} className='mr-1' />
                  Add to Wishlist
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className='flex items-center hover:text-blue-500 transition duration-200'
                >
                  <Share2 size={20} className='mr-1' />
                  Share
                </motion.button>
              </div>

              <div className='border-t pt-4'>
                <div className='flex items-center text-gray-600 mb-2'>
                  <Truck size={20} className='mr-2 text-green-500' />
                  Free Delivery
                </div>
                <div className='flex items-center text-sm text-gray-500 mb-2'>
                  <MapPin size={16} className='mr-2' />
                  {product.city}, {product.state}, {product.country}
                </div>
                <div className='flex items-center text-sm text-gray-500'>
                  <Calendar size={16} className='mr-2' />
                  Added on {new Date(product.dateAdded).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Tabs */}
          <div className='mt-8'>
            <div className='flex border-b'>
              {['description', 'details', 'reviews'].map(tab => (
                <button
                  key={tab}
                  className={`py-2 px-4 font-semibold ${
                    activeTab === tab
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className='py-4'
              >
                {activeTab === 'description' && (
                  <p className='text-gray-600'>{product.description}</p>
                )}
                {activeTab === 'details' && (
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div>
                      <strong className='text-gray-700'>Price:</strong> ₹{' '}
                      {product.price}/{product.priceCategory}
                    </div>
                    <div>
                      <strong className='text-gray-700'>
                        Quantity Available:
                      </strong>{' '}
                      {product.quantity} {product.quantityCategory}
                    </div>
                    {/* <div>
                      <strong className='text-gray-700'>Vendor ID:</strong>{' '}
                      {product.vendorId}
                    </div>
                    <div>
                      <strong className='text-gray-700'>Product ID:</strong>{' '}
                      {product._id}
                    </div> */}
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <p className='text-gray-600'>
                    Customer reviews will be displayed here.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductDetailsCard
