'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Truck,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle,
  HelpCircle
} from 'lucide-react'

const ShippingPolicy = () => {
  const sections = [
    {
      title: 'Shipping Methods',
      icon: Truck,
      content: 'We offer various shipping methods to cater to your needs:',
      items: [
        'Standard Shipping (3-5 business days)',
        'Express Shipping (1-2 business days)',
        'Same Day Delivery (select areas only)'
      ]
    },
    {
      title: 'Processing Time',
      icon: Clock,
      content:
        'Order processing times may vary depending on the product and current demand:',
      items: [
        'Most orders are processed within 1-2 business days',
        'Custom or made-to-order items may require additional processing time',
        'You will receive a notification once your order has been shipped'
      ]
    },
    {
      title: 'Shipping Destinations',
      icon: MapPin,
      content: 'We currently ship to the following areas:',
      items: [
        'All major cities in India',
        'Select international destinations (additional fees may apply)',
        'For remote areas, delivery times may be extended'
      ]
    },
    {
      title: 'Shipping Costs',
      icon: AlertCircle,
      content: 'Shipping costs are calculated based on:',
      items: [
        'The selected shipping method',
        'The destination address',
        'The weight and dimensions of the package',
        'Free shipping is available for orders over ₹1000 (standard shipping only)'
      ]
    },
    {
      title: 'Order Tracking',
      icon: CheckCircle,
      content: 'Stay informed about your order status:',
      items: [
        'A tracking number will be provided via email once your order is shipped',
        'You can track your order on our website using the provided tracking number',
        'For any issues with tracking, please contact our customer support'
      ]
    },
    {
      title: 'Shipping Policy Changes',
      icon: HelpCircle,
      content: 'Please note:',
      items: [
        'We reserve the right to modify our shipping policy at any time',
        'Any changes will be reflected on this page',
        "It is the customer's responsibility to review the shipping policy before placing an order"
      ]
    }
  ]

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <motion.h1
          className='text-3xl font-bold text-center mb-8 text-gray-800'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shipping Policy
        </motion.h1>
        <motion.p
          className='text-center text-gray-600 mb-12'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          At E-Market, we strive to provide the best shipping experience for our
          customers. Please review our shipping policy below for important
          information about your order.
        </motion.p>
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className='bg-white rounded-lg shadow-md p-6 mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className='flex items-center mb-4'>
              <section.icon className='w-6 h-6 text-blue-500 mr-2' />
              <h2 className='text-xl font-semibold text-gray-800'>
                {section.title}
              </h2>
            </div>
            <p className='text-gray-600 mb-4'>{section.content}</p>
            <ul className='list-disc pl-5 space-y-2'>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className='text-gray-600'>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
        <motion.p
          className='text-center text-gray-600 mt-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          For any questions or concerns regarding our shipping policy, please
          contact our customer support team.
        </motion.p>
      </div>
    </div>
  )
}

export default ShippingPolicy
