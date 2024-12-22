import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

// Mock data (replace with actual API calls in a real application)
const mockData = {
  revenue: [1500, 2500, 2000, 3000, 2800, 3500, 4000],
  orders: [50, 80, 70, 90, 85, 100, 120],
  products: [10, 12, 15, 14, 16, 18, 20],
  categories: ['Electronics', 'Clothing', 'Books', 'Home', 'Beauty'],
  categoryData: [30, 25, 15, 20, 10]
}

const Analytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
        data: mockData[selectedMetric],
        borderColor: 'rgb(53, 162, 235)',
        tension: 0.1
      }
    ]
  }

  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: mockData.orders,
        backgroundColor: 'rgba(53, 162, 235, 1)'
      }
    ]
  }

  const doughnutChartData = {
    labels: mockData.categories,
    datasets: [
      {
        data: mockData.categoryData,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ]
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  }

  const metricButtons = ['revenue', 'orders', 'products']

  return (
    <div className='min-h-screen px-4 pb-6'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='max-w-7xl mx-auto bg-gray-100  sm:p-8 py-4 px-2'
      >
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Seller Analytics Dashboard
        </h1>

        <AnimatePresence>
          {
            <motion.div
              key='content'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className='grid grid-cols-3 gap-4 sm:gap-8 sm:mb-8 sm:px-10 px-4 mb-4'>
                {metricButtons.map(metric => (
                  <motion.button
                    key={metric}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMetric(metric)}
                    className={`p-2 sm:p-4 rounded-lg shadow-md text-white font-semibold text-lg ${
                      selectedMetric === metric ? 'bg-blue-600' : 'bg-gray-400'
                    }`}
                  >
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </motion.button>
                ))}
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8 py-2'>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className='bg-white p-4 rounded-lg shadow-lg border border-black'
                >
                  <h2 className='text-xl font-semibold mb-4'>
                    Weekly{' '}
                    {selectedMetric.charAt(0).toUpperCase() +
                      selectedMetric.slice(1)}
                  </h2>
                  <div className='h-80'>
                    <Line data={lineChartData} options={chartOptions} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className='bg-white p-4 rounded-lg shadow-lg border border-black'
                >
                  <h2 className='text-xl font-semibold mb-4'>Weekly Orders</h2>
                  <div className='h-80'>
                    <Bar data={barChartData} options={chartOptions} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className='bg-white p-4 rounded-lg shadow-lg md:col-span-2 border border-black'
                >
                  <h2 className='text-xl font-semibold mb-4'>
                    Product Categories
                  </h2>
                  <div className='h-80'>
                    <Doughnut data={doughnutChartData} options={chartOptions} />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='mt-8 bg-white p-4 rounded-lg shadow-lg '
              >
                <h2 className='text-xl font-semibold mb-4'>Quick Stats</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='bg-blue-100 p-4 rounded-lg'>
                    <h3 className='text-lg font-semibold text-blue-800'>
                      Total Revenue
                    </h3>
                    <p className='text-2xl font-bold text-blue-600'>
                      ${mockData.revenue.reduce((a, b) => a + b, 0)}
                    </p>
                  </div>
                  <div className='bg-green-100 p-4 rounded-lg'>
                    <h3 className='text-lg font-semibold text-green-800'>
                      Total Orders
                    </h3>
                    <p className='text-2xl font-bold text-green-600'>
                      {mockData.orders.reduce((a, b) => a + b, 0)}
                    </p>
                  </div>
                  <div className='bg-purple-100 p-4 rounded-lg'>
                    <h3 className='text-lg font-semibold text-purple-800'>
                      Total Products
                    </h3>
                    <p className='text-2xl font-bold text-purple-600'>
                      {mockData.products[mockData.products.length - 1]}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Analytics
