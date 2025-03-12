import React, { useState, useEffect } from 'react'
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import {
  Package,
  PlusCircle,
  BarChart2,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Home
} from 'lucide-react'
import ProductListing from './ProductListing'
import AddProduct from './AddProduct'
import VendorHome from './VendorHome'
import Analytics from './Analytics'
import Orders from './Orders'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const Dashboard = () => {
  const [vendorData, setVendorData] = useState({})
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  let navigate = useNavigate()

  useEffect(() => {
    checkLogin()
    fetchVendorData()
  }, [])

  const checkLogin = () => {
    if (!localStorage.getItem('authToken')) {
      navigate('/')
    }
  }

  const fetchVendorData = async () => {
    // Get the vendor's auth token from localStorage
    setLoading(true)
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      // Handle the case where the token is not available
      console.error('No auth token found')
      return
    }

    try {
      // Make the API call with the token in the Authorization header
      const response = await fetch(`${backendUrl}/api/auth/vendor/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authToken: localStorage.getItem('authToken')
        }
      })

      const result = await response.json()
      if (!result.success) {
        // Handle any errors with the request
        throw new Error('Failed to fetch data')
      }
      setVendorData(result.vendorDetails)
    } catch (error) {
      console.error('Error fetching vendor data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      }
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  const sidebarItems = [
    { icon: Home, label: 'Home', route: '/dashboard/' },
    { icon: Package, label: 'Products', route: '/dashboard/products' },
    { icon: PlusCircle, label: 'Add Product', route: '/dashboard/add-product' },
    { icon: BarChart2, label: 'Analytics', route: '/dashboard/analytics' },
    { icon: Users, label: 'Customers', route: '/dashboard/customers' },
    { icon: Settings, label: 'Settings', route: '/dashboard/settings' }
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='flex bg-gray-100'>
      {isMobile && isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'} 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          bg-white w-64 min-h-screen p-4 transition-transform duration-300 ease-in-out
        `}
      >
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-xl font-bold'>Vendor Dashboard</h2>
          {isMobile && (
            <button onClick={toggleSidebar} className='p-2'>
              <X size={24} />
            </button>
          )}
        </div>
        <nav>
          {sidebarItems.map((item, index) => (
            <Link
              to={item.route}
              key={index}
              onClick={isMobile ? toggleSidebar : undefined}
              className={`flex items-center p-2 mb-2 rounded ${
                location.pathname === item.route
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className='mr-2 h-5 w-5' />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className='flex-1 sm:p-6 p-2'>
        <button
          className='mb-4 md:hidden p-2 bg-white rounded shadow'
          onClick={toggleSidebar}
        >
          <h2></h2>
          {isSidebarOpen ? (
            <h1>
              <ChevronLeft className='h-6 w-6' />
            </h1>
          ) : (
            <h1 className='flex'>
              <p>
                <b>Menu</b>
              </p>
              <ChevronRight className='h-6 w-6' />
            </h1>
          )}
        </button>
        <div className=''>
          <Routes>
            <Route
              path=''
              element={<VendorHome vendorData={vendorData} loading={loading} />}
            />
            <Route path='products' element={<ProductListing />} />
            <Route path='add-product' element={<AddProduct />} />
            <Route path='analytics' element={<Analytics />} />
            <Route
              path='customers'
              element={<h2>Customers (Coming Soon)</h2>}
            />
            <Route path='orders' element={<Orders />} />
            <Route path='settings' element={<h2>Settings (Coming Soon)</h2>} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
