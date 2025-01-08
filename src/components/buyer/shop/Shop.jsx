import React, { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ChevronDown, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ProductCard from './ProductCard'
import ProductSkeleton from '../../common/loader/ProductSkeleton'
import stateData from '../../../data/states.json'
import districtData from '../../../data/districts.json'
import alertContext from '../../../context/alert/alertContext'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedState, setSelectedState] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedVillage, setSelectedVillage] = useState('')
  const [selectedHarvestingStatus, setSelectedHarvestingStatus] =
    useState('All')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Temporary states for filter options
  const [tempCategory, setTempCategory] = useState(selectedCategory)
  const [tempPriceRange, setTempPriceRange] = useState(priceRange)
  const [tempState, setTempState] = useState(selectedState)
  const [tempDistrict, setTempDistrict] = useState(selectedDistrict)
  const [tempVillage, setTempVillage] = useState(selectedVillage)
  const [tempHarvestingStatus, setTempHarvestingStatus] = useState(
    selectedHarvestingStatus
  )

  // States for location data
  const [states, setStates] = useState([])
  const [districts, setDistricts] = useState([])
  // const [villages, setVillages] = useState([])

  // states for product
  const [products, setProducts] = useState([])

  // state for loader
  const [isLoading, setLoading] = useState(false)

  let navigate = useNavigate()

  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  // Data for options
  const categories = ['All', 'Crops', 'Fruits', 'Flowers', 'Meat', 'Grains']
  const harvestingStatuses = [
    'All',
    'Ready',
    'Daily',
    'Available',
    'Fresh Pick',
    'Aged',
    'Seasonal'
  ]

  useEffect(() => {
    checkLogin()
    fetchProducts()
    fetchStates()
  }, [])

  useEffect(() => {
    if (tempState) {
      fetchDistricts(tempState)
    } else {
      setDistricts([])
    }
  }, [tempState])

  // useEffect(() => {
  //   if (tempDistrict) {
  //     fetchVillages(tempState, tempDistrict)
  //   } else {
  //     setVillages([])
  //   }
  // }, [tempState, tempDistrict])

  const checkLogin = () => {
    if (!localStorage.getItem('authToken')) {
      navigate('/')
      showAlert('Please Login First', 'danger')
      return
    }
    if (localStorage.getItem('role') !== 'buyer') {
      navigate('/')
      showAlert('You are not a Buyer. Please login as Buyer!', 'danger')
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${backendUrl}/api/product/buyer/products`)
      const data = await response.json()
      setProducts(data.reverse())
    } catch (error) {
      console.error('Error fetching product:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const fetchStates = async () => {
    try {
      setStates(stateData.states || [])
    } catch (error) {
      console.log('Error fetching states:', error)
      setStates([])
    }
  }

  const fetchDistricts = state => {
    try {
      const stateDistricts = districtData[state] || []
      setDistricts(stateDistricts)
    } catch (error) {
      console.log('Error fetching districts:', error)
      setDistricts([])
    }
  }

  const filteredProducts = products.filter(
    product =>
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      (selectedState === '' || product.state === selectedState) &&
      (selectedDistrict === '' || product.city === selectedDistrict) &&
      (selectedHarvestingStatus === 'All' ||
        product.harvestingStatus === selectedHarvestingStatus) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  )

  const handleApplyFilters = () => {
    setSelectedCategory(tempCategory)
    setPriceRange(tempPriceRange)
    setSelectedState(tempState)
    setSelectedDistrict(tempDistrict)
    setSelectedVillage(tempVillage)
    setSelectedHarvestingStatus(tempHarvestingStatus)
    setIsFilterOpen(false)
  }

  return (
    <>
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <>
          <div className='flex justify-between items-start z-10 w-full fixed pl-2 pr-1 py-1 bg-white bg-opacity-30 backdrop-blur-md'>
            <div className='w-56 sm:w-72'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search products...'
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <Search
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={20}
                />
              </div>
            </div>
            <div className='w-auto relative'>
              <motion.button
                className='flex items-center justify-between w-full md:w-auto bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-700 transition duration-300'
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className='mr-2' size={20} />
                Filters
                <ChevronDown
                  className={`ml-2 transform transition-transform duration-300 ${
                    isFilterOpen ? 'rotate-180' : ''
                  }`}
                  size={20}
                />
              </motion.button>
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className='absolute right-0 mt-2 w-72 md:w-96 bg-white p-4 rounded-md shadow-lg z-10'
                  >
                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Category
                        </label>
                        <select
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          value={tempCategory}
                          onChange={e => setTempCategory(e.target.value)}
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Price Range
                        </label>
                        <div className='flex items-center space-x-2'>
                          <input
                            type='number'
                            min='0'
                            max='1000'
                            value={tempPriceRange[0]}
                            onChange={e =>
                              setTempPriceRange([
                                Number(e.target.value),
                                tempPriceRange[1]
                              ])
                            }
                            className='w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          />
                          <span>-</span>
                          <input
                            type='number'
                            min='0'
                            max='1000'
                            value={tempPriceRange[1]}
                            onChange={e =>
                              setTempPriceRange([
                                tempPriceRange[0],
                                Number(e.target.value)
                              ])
                            }
                            className='w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          />
                        </div>
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          State
                        </label>
                        <select
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          value={tempState}
                          onChange={e => {
                            setTempState(e.target.value)
                            setTempDistrict('')
                          }}
                        >
                          <option value=''>Select State</option>
                          {states.map(state => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          District
                        </label>
                        <select
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          value={tempDistrict}
                          onChange={e => {
                            setTempDistrict(e.target.value)
                          }}
                          disabled={!tempState}
                        >
                          <option value=''>Select District</option>
                          {districts.map(district => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Harvesting Status
                        </label>
                        <select
                          className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          value={tempHarvestingStatus}
                          onChange={e =>
                            setTempHarvestingStatus(e.target.value)
                          }
                        >
                          {harvestingStatuses.map(status => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                      <motion.button
                        className='w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center'
                        onClick={handleApplyFilters}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Check className='mr-2' size={20} />
                        Apply Filters
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className='px-1 sm:px-2 py-2 mt-12'>
            <motion.div
              className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
            {filteredProducts.length === 0 && !isLoading && (
              <p className='text-center text-gray-600 mt-8'>
                No products found. Try adjusting your search or filters.
              </p>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Shop
