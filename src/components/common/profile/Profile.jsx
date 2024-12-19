'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Edit,
  Save,
  X,
  ShoppingBag,
  CreditCard,
  User,
  Package,
  Heart,
  Star,
  Truck,
  Bell,
  Plus
} from 'lucide-react'

const defaultUserInfo = {
  name: 'Guest User',
  email: 'guest@example.com',
  phone: 'N/A',
  address: 'N/A',
  avatar: 'https://via.placeholder.com/150',
  memberSince: 'N/A',
  preferences: [],
  loyaltyPoints: 0,
  shippingAddresses: []
}

const defaultUserStats = {
  totalOrders: 0,
  totalSpent: 0,
  wishlistItems: 0,
  reviewsGiven: 0
}

const UserProfile = ({
  userInfo = defaultUserInfo,
  userStats = defaultUserStats
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUserInfo, setEditedUserInfo] = useState(userInfo)
  const [activeTab, setActiveTab] = useState('personal-info')

  const handleInputChange = e => {
    const { name, value } = e.target
    setEditedUserInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    console.log('Saving user info:', editedUserInfo)
    setIsEditing(false)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const TabContent = () => {
    switch (activeTab) {
      case 'personal-info':
        return (
          <div>
            {isEditing ? (
              <form
                onSubmit={e => {
                  e.preventDefault()
                  handleSave()
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <label htmlFor='name'>Full Name</label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={editedUserInfo.name}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginTop: '0.25rem'
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={editedUserInfo.email}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginTop: '0.25rem'
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='phone'>Phone</label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={editedUserInfo.phone}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginTop: '0.25rem'
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='address'>Address</label>
                    <input
                      type='text'
                      id='address'
                      name='address'
                      value={editedUserInfo.address}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginTop: '0.25rem'
                      }}
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Contact Information
                  </h2>
                  <p>Email: {userInfo.email}</p>
                  <p>Phone: {userInfo.phone}</p>
                  <p>Address: {userInfo.address}</p>
                </div>
                <div>
                  <h2
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Preferences
                  </h2>
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
                  >
                    {userInfo.preferences.map((pref, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: '#e2e8f0',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.875rem'
                        }}
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      case 'orders':
        return (
          <div>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}
            >
              Order History
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              View your past orders and their status
            </p>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #e2e8f0',
                    paddingBottom: '0.5rem'
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 'bold' }}>Order #{1000 + index}</p>
                    <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                      Placed on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      backgroundColor:
                        index === 0
                          ? '#48BB78'
                          : index === 1
                          ? '#4299E1'
                          : '#CBD5E0',
                      color: 'white'
                    }}
                  >
                    {index === 0
                      ? 'Shipped'
                      : index === 1
                      ? 'Processing'
                      : 'Delivered'}
                  </span>
                </div>
              ))}
            </div>
            <button
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              View All Orders
            </button>
          </div>
        )
      case 'wishlist':
        return (
          <div>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}
            >
              Your Wishlist
            </h2>
            <p style={{ marginBottom: '1rem' }}>Items you've saved for later</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem'
              }}
            >
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.375rem',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <div
                    style={{
                      width: '4rem',
                      height: '4rem',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '0.25rem',
                      flexShrink: 0
                    }}
                  ></div>
                  <div>
                    <p style={{ fontWeight: 'bold' }}>Product Name</p>
                    <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                      $99.99
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              View Full Wishlist
            </button>
          </div>
        )
      case 'reviews':
        return (
          <div>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}
            >
              Your Reviews
            </h2>
            <p style={{ marginBottom: '1rem' }}>Products you've reviewed</p>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom: '1px solid #e2e8f0',
                    paddingBottom: '1rem'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <p style={{ fontWeight: 'bold' }}>Product Name</p>
                    <div style={{ display: 'flex' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < 4 ? '#FCD34D' : 'none'}
                          stroke={i < 4 ? '#FCD34D' : '#CBD5E0'}
                        />
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              ))}
            </div>
            <button
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              View All Reviews
            </button>
          </div>
        )
      case 'settings':
        return (
          <div>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}
            >
              Account Settings
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Manage your account preferences
            </p>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <label htmlFor='notifications' style={{ fontWeight: 'bold' }}>
                    Email Notifications
                  </label>
                  <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                    Receive email updates about your orders and account
                  </p>
                </div>
                <input type='checkbox' id='notifications' />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <label htmlFor='marketing' style={{ fontWeight: 'bold' }}>
                    Marketing Preferences
                  </label>
                  <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                    Receive promotional emails about new products and sales
                  </p>
                </div>
                <input type='checkbox' id='marketing' />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <label htmlFor='twoFactor' style={{ fontWeight: 'bold' }}>
                    Two-Factor Authentication
                  </label>
                  <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                    Add an extra layer of security to your account
                  </p>
                </div>
                <input type='checkbox' id='twoFactor' />
              </div>
            </div>
            <button
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Save Settings
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #f7fafc, #edf2f7)',
        padding: '3rem 1rem'
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <motion.div
          variants={childVariants}
          style={{
            backgroundColor: 'white',
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            borderRadius: '0.5rem',
            overflow: 'hidden'
          }}
        >
          <div style={{ padding: '1.5rem 2.5rem' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: '1.5rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}
              >
                <div
                  style={{
                    width: '5rem',
                    height: '5rem',
                    borderRadius: '50%',
                    backgroundColor: '#e2e8f0',
                    marginRight: '1rem',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={userInfo.avatar}
                    alt={userInfo.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div>
                  <h1
                    style={{
                      fontSize: '1.875rem',
                      fontWeight: 'bold',
                      color: '#1a202c'
                    }}
                  >
                    {userInfo.name}
                  </h1>
                  <p style={{ color: '#718096' }}>
                    Member since {userInfo.memberSince}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                {isEditing ? (
                  <X style={{ marginRight: '0.5rem' }} />
                ) : (
                  <Edit style={{ marginRight: '0.5rem' }} />
                )}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </motion.button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div
                style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}
              >
                {[
                  'personal-info',
                  'orders',
                  'wishlist',
                  'reviews',
                  'settings'
                ].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor:
                        activeTab === tab ? '#4CAF50' : 'transparent',
                      color: activeTab === tab ? 'white' : '#4A5568',
                      border: 'none',
                      borderBottom:
                        activeTab === tab ? '2px solid #4CAF50' : 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode='wait'>
              <motion.div
                key={isEditing ? 'edit' : 'view'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabContent />
              </motion.div>
            </AnimatePresence>

            <motion.div
              variants={childVariants}
              style={{ marginTop: '2.5rem' }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1a202c',
                  marginBottom: '1.5rem'
                }}
              >
                Account Overview
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem'
                }}
              >
                <motion.div
                  style={{
                    backgroundColor: '#EBF8FF',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    textAlign: 'center'
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <ShoppingBag
                    style={{
                      width: '2rem',
                      height: '2rem',
                      color: '#4299E1',
                      margin: '0 auto 0.5rem'
                    }}
                  />
                  <h4
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 'medium',
                      color: '#718096'
                    }}
                  >
                    Total Orders
                  </h4>
                  <p
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#2D3748'
                    }}
                  >
                    {userStats.totalOrders}
                  </p>
                </motion.div>
                <motion.div
                  style={{
                    backgroundColor: '#F0FFF4',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    textAlign: 'center'
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <CreditCard
                    style={{
                      width: '2rem',
                      height: '2rem',
                      color: '#48BB78',
                      margin: '0 auto 0.5rem'
                    }}
                  />
                  <h4
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 'medium',
                      color: '#718096'
                    }}
                  >
                    Total Spent
                  </h4>
                  <p
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#2D3748'
                    }}
                  >
                    ${userStats.totalSpent}
                  </p>
                </motion.div>
                <motion.div
                  style={{
                    backgroundColor: '#FAF5FF',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    textAlign: 'center'
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Heart
                    style={{
                      width: '2rem',
                      height: '2rem',
                      color: '#9F7AEA',
                      margin: '0 auto 0.5rem'
                    }}
                  />
                  <h4
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 'medium',
                      color: '#718096'
                    }}
                  >
                    Wishlist Items
                  </h4>
                  <p
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#2D3748'
                    }}
                  >
                    {userStats.wishlistItems}
                  </p>
                </motion.div>
                <motion.div
                  style={{
                    backgroundColor: '#FFFAF0',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    textAlign: 'center'
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Star
                    style={{
                      width: '2rem',
                      height: '2rem',
                      color: '#ECC94B',
                      margin: '0 auto 0.5rem'
                    }}
                  />
                  <h4
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 'medium',
                      color: '#718096'
                    }}
                  >
                    Reviews Given
                  </h4>
                  <p
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#2D3748'
                    }}
                  >
                    {userStats.reviewsGiven}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={childVariants}
              style={{ marginTop: '2.5rem' }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1a202c',
                  marginBottom: '1.5rem'
                }}
              >
                Loyalty Program
              </h3>
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  boxShadow:
                    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {userInfo.loyaltyPoints} Points
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                      Available to redeem
                    </p>
                  </div>
                  <button
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    Redeem Points
                  </button>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                    Earn 1 point for every $1 spent. Redeem points for discounts
                    on future purchases!
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={childVariants}
              style={{ marginTop: '2.5rem' }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1a202c',
                  marginBottom: '1.5rem'
                }}
              >
                Shipping Addresses
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '1rem'
                }}
              >
                {userInfo.shippingAddresses.map(address => (
                  <div
                    key={address.id}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                      boxShadow:
                        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start'
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: 'bold' }}>{address.name}</p>
                        <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                          {address.address}
                        </p>
                      </div>
                      {address.isDefault && (
                        <span
                          style={{
                            backgroundColor: '#E2E8F0',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem'
                          }}
                        >
                          Default
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        marginTop: '1rem',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '0.5rem'
                      }}
                    >
                      <button
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: 'transparent',
                          border: '1px solid #CBD5E0',
                          borderRadius: '0.25rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: 'transparent',
                          border: '1px solid #CBD5E0',
                          borderRadius: '0.25rem',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    boxShadow:
                      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    border: '2px dashed #CBD5E0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      border: '1px solid #CBD5E0',
                      borderRadius: '0.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus style={{ marginRight: '0.5rem' }} /> Add New Address
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default UserProfile
