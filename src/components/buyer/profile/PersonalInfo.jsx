import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Check,
  X
} from 'lucide-react'

const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [buyer, setBuyer] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    const fetchBuyerInfo = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/buyer/profile`,
          {
            headers: {
              'Content-Type': 'application/json',
              authToken: localStorage.getItem('authToken')
            }
          }
        )
        const data = await response.json()
        if (data.success) {
          setBuyer(data.buyer)
          setFormData({
            name: data.buyer.name,
            email: data.buyer.email,
            phone: data.buyer.phone,
            address: data.buyer.address
          })
        } else {
          setError(data.message)
        }
      } catch (err) {
        setBuyer({
          name: 'Your Name',
          email: 'name@gmail.com',
          phone: 'xxxxxxxxxx',
          address: 'AP-xxxxx'
        })
        setFormData({
          name: 'Your Name',
          email: 'name@gmail.com',
          phone: 'xxxxxxxxxx',
          address: 'AP-xxxxx'
        })
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBuyerInfo()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/buyer/update-profile`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authToken: localStorage.getItem('authToken')
          },
          body: JSON.stringify(formData)
        }
      )
      const data = await response.json()
      if (data.success) {
        setBuyer({ ...buyer, ...formData })
        setIsEditing(false)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to update profile')
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='max-w-2xl mx-auto p-4 text-center text-red-600'>
        <p>{error}</p>
      </div>
    )
  }

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className='flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200'>
      <Icon className='w-5 h-5 text-gray-500' />
      <div className='flex-1'>
        <p className='text-sm text-gray-500'>{label}</p>
        <p className='font-medium'>{value}</p>
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='max-w-2xl mx-auto p-4'
    >
      <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
        <div className='p-6 bg-primary text-white flex justify-between items-center'>
          <div>
            <h1 className='text-2xl font-bold'>Personal Information</h1>
            <p className='text-primary-foreground/80'>
              Manage your personal details
            </p>
          </div>
          {!isEditing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className='flex items-center space-x-2 bg-white text-primary px-4 py-2 rounded-lg'
            >
              <Edit2 className='w-4 h-4' />
              <span>Edit</span>
            </motion.button>
          )}
        </div>

        <div className='p-6'>
          {isEditing ? (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Name
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Phone
                </label>
                <input
                  type='tel'
                  value={formData.phone}
                  onChange={e =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={e =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows={3}
                  className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none'
                />
              </div>
              <div className='flex space-x-4'>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type='submit'
                  className='flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center space-x-2'
                >
                  <Check className='w-4 h-4' />
                  <span>Save Changes</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type='button'
                  onClick={() => {
                    setFormData({
                      name: buyer.name,
                      email: buyer.email,
                      phone: buyer.phone,
                      address: buyer.address
                    })
                    setIsEditing(false)
                  }}
                  className='flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2'
                >
                  <X className='w-4 h-4' />
                  <span>Cancel</span>
                </motion.button>
              </div>
            </form>
          ) : (
            <div className='space-y-2'>
              <InfoRow icon={User} label='Name' value={buyer.name} />
              <InfoRow icon={Mail} label='Email' value={buyer.email} />
              <InfoRow icon={Phone} label='Phone' value={buyer.phone} />
              <InfoRow icon={MapPin} label='Address' value={buyer.address} />
              <InfoRow
                icon={Calendar}
                label='Member Since'
                value={new Date(buyer.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              />
            </div>
          )}
        </div>
      </div>

      {/* Order Statistics */}
      <div className='mt-6 grid grid-cols-2 gap-4'>
        <motion.div
          whileHover={{ y: -2 }}
          className='bg-white p-6 rounded-xl shadow-lg'
        >
          <h3 className='text-lg font-semibold mb-2'>Total Orders</h3>
          <p className='text-3xl font-bold text-primary'>
            {buyer.orders ? buyer.orders.length : 0}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className='bg-white p-6 rounded-xl shadow-lg'
        >
          <h3 className='text-lg font-semibold mb-2'>Cart Items</h3>
          <p className='text-3xl font-bold text-primary'>
            {buyer.cart?.items ? buyer.cart.items.length : 0}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PersonalInfo
