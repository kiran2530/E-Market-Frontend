'use client'

import React, { useEffect, useState } from 'react'
import {
  BarChartIcon,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import SkeletonLoader from '../../loader/SkeletoLoader'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const VendorHome = ({ vendorData, loading }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly')
  const [salesData, setSalesData] = useState({
    totalSale: { totalCount: 0, percentage: 100 },
    ordersPending: { totalCount: 0, percentage: 100 },
    productsList: { totalCount: 0, percentage: 100 },
    averageRating: 0
  })
  const [isSalesDataFetching, setIsSalesDataFetching] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [selectedPeriod])

  /*
  const recentOrders = [
    { id: '1001', customer: 'Alice Johnson', total: 129.99, status: 'Shipped' },
    { id: '1002', customer: 'Bob Smith', total: 79.5, status: 'Processing' },
    {
      id: '1003',
      customer: 'Carol Williams',
      total: 199.99,
      status: 'Delivered'
    },
    { id: '1004', customer: 'David Brown', total: 149.99, status: 'Pending' },
    { id: '1005', customer: 'Eva Davis', total: 89.99, status: 'Shipped' }
  ]

  const topProducts = [
    { id: '1', name: 'Wireless Earbuds', sales: 120, revenue: 2399.99 },
    { id: '2', name: 'Smart Watch', sales: 85, revenue: 1699.99 },
    { id: '3', name: 'Portable Charger', sales: 200, revenue: 1599.99 },
    { id: '4', name: 'Bluetooth Speaker', sales: 75, revenue: 1499.99 },
    { id: '5', name: 'Fitness Tracker', sales: 95, revenue: 1399.99 }
  ]
  */

  const salesChartData = [
    { name: 'Mon', sales: 1000 },
    { name: 'Tue', sales: 1500 },
    { name: 'Wed', sales: 1200 },
    { name: 'Thu', sales: 1800 },
    { name: 'Fri', sales: 2000 },
    { name: 'Sat', sales: 2400 },
    { name: 'Sun', sales: 2200 }
  ]

  const categoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Books', value: 200 },
    { name: 'Home & Garden', value: 100 }
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const fetchDashboardData = async () => {
    setIsSalesDataFetching(true)
    // Get the vendor's auth token from localStorage
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      // Handle the case where the token is not available
      console.error('No auth token found')
      return
    }

    try {
      // Make the API call with the token in the Authorization header
      const response = await fetch(`${backendUrl}/api/dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authToken: localStorage.getItem('authToken')
        },
        body: JSON.stringify({
          period: selectedPeriod
        })
      })

      const result = await response.json()
      if (!result.success) {
        // Handle any errors with the request
        throw new Error('Failed to fetch data')
      }
      setSalesData(result.salesData)
    } catch (error) {
      console.error('Error fetching Dashboard data:', error)
    } finally {
      setIsSalesDataFetching(false)
    }
  }

  return (
    <div className='px-4 pb-6 sm:p-6 lg:p-8 max-w-7xl mx-auto font-sans bg-gray-100'>
      {/* Header Section */}
      <div className='flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
          Welcome back, {vendorData.name}!
        </h1>
        <div className='flex space-x-2'>
          {['daily', 'weekly', 'monthly'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {isSalesDataFetching ? (
          <>
            <SkeletonLoader className='h-32' />
            <SkeletonLoader className='h-32' />
            <SkeletonLoader className='h-32' />
            <SkeletonLoader className='h-32' />
          </>
        ) : (
          <>
            <InfoCard
              icon={<DollarSign size={24} />}
              title='Total Sales'
              value={salesData.totalSale.totalCount}
              trend={salesData.totalSale.percentage.toFixed(2)}
              color='#4CAF50'
            />
            <InfoCard
              icon={<ShoppingCart size={24} />}
              title='Orders Pending'
              value={salesData.ordersPending.totalCount}
              trend={salesData.ordersPending.percentage.toFixed(2)}
              color='#FFC107'
            />
            <InfoCard
              icon={<Package size={24} />}
              title='Products Listed'
              value={salesData.productsList.totalCount}
              trend={salesData.productsList.percentage.toFixed(2)}
              color='#2196F3'
            />
            <InfoCard
              icon={<BarChartIcon size={24} />}
              title='Avg. Rating'
              value={salesData.averageRating.toFixed(1)}
              // trend={0.3}
              color='#9C27B0'
            />
          </>
        )}
      </div>

      {/* Chart Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg sm:text-xl font-semibold mb-4'>
            Sales Overview
          </h2>
          <div className='h-64 sm:h-80'>
            {isSalesDataFetching ? (
              <SkeletonLoader className='w-full h-full' />
            ) : (
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={salesChartData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='sales' fill='#4CAF50' />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md relative'>
          <h2 className='sm:text-xl font-semibold mb-4'>
            Category Distribution
          </h2>
          <div className='h-64 sm:h-80'>
            {isSalesDataFetching ? (
              <SkeletonLoader className='w-full h-full' />
            ) : (
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    outerRadius={100}
                    fill='#8884d8'
                    dataKey='value'
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          {isSalesDataFetching ? (
            ''
          ) : (
            <div className='absolute top-2 right-4'>
              {categoryData.map((entry, index) => (
                <div key={entry.name} className='flex items-center mb-1'>
                  <div
                    className='w-4 h-4 rounded-full'
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className='ml-1 text-xs text-gray-700'>
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      {/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-lg sm:text-xl font-semibold mb-4'>
            Recent Orders
          </h2>
          <div className={`overflow-x-auto ${loading ? 'h-64' : ''}`}>
            {loading ? (
              <SkeletonLoader className='w-full h-full' />
            ) : (
              <table className='w-full'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='p-3 text-left'>Order ID</th>
                    <th className='p-3 text-left'>Customer</th>
                    <th className='p-3 text-left'>Total</th>
                    <th className='p-3 text-left'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className='border-b'>
                      <td className='p-3'>{order.id}</td>
                      <td className='p-3'>{order.customer}</td>
                      <td className='p-3'>${order.total.toFixed(2)}</td>
                      <td className='p-3'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-lg sm:text-xl font-semibold mb-4'>
            Top Selling Products
          </h2>
          <div className={`overflow-x-auto ${loading ? 'h-64' : ''}`}>
            {loading ? (
              <SkeletonLoader className='w-full h-full' />
            ) : (
              <table className='w-full'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='p-3 text-left'>Product</th>
                    <th className='p-3 text-left'>Sales</th>
                    <th className='p-3 text-left'>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map(product => (
                    <tr key={product.id} className='border-b'>
                      <td className='p-3'>{product.name}</td>
                      <td className='p-3'>{product.sales}</td>
                      <td className='p-3'>${product.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div> */}
    </div>
  )
}

const InfoCard = ({ icon, title, value, trend, color }) => (
  <div className='bg-white rounded-lg p-6 shadow-md flex items-center'>
    <div className={`rounded-full p-3 mr-4`} style={{ backgroundColor: color }}>
      {React.cloneElement(icon, { color: 'white' })}
    </div>
    <div>
      <h3 className='text-sm text-gray-600 mb-1'>{title}</h3>
      <p className='text-lg sm:text-2xl font-bold text-gray-800'>{value}</p>
      {trend && (
        <div
          className={`flex items-center mt-2 ${
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className='ml-1 text-sm font-medium'>{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
  </div>
)

const getStatusColor = status => {
  switch (status) {
    case 'Shipped':
      return 'bg-blue-100 text-blue-800'
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800'
    case 'Delivered':
      return 'bg-green-100 text-green-800'
    case 'Pending':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default VendorHome
