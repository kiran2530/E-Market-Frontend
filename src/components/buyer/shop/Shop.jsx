import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ChevronDown, Check } from 'lucide-react'
import ProductCard from './ProductCard'

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
  const [villages, setVillages] = useState([])

  // Mock product data
  const products = [
    {
      id: 1,
      name: 'Organic Apples',
      price: 2.99,
      rating: 4,
      reviews: 120,
      description: 'Fresh, locally grown organic apples.',
      image:
        'https://5.imimg.com/data5/UM/DM/MY-43685925/organic-apple-1000x1000.jpg',
      category: 'Fruits',
      state: 'Maharashtra',
      district: 'Pune',
      village: 'Khed',
      harvestingStatus: 'Ready'
    },
    {
      id: 2,
      name: 'Free-range Eggs',
      price: 4.99,
      rating: 5,
      reviews: 85,
      description: 'Farm-fresh free-range eggs.',
      image:
        'https://www.cookandbutcher.co.uk/wp-content/uploads/2021/02/6-eggs-resized-min.jpg',
      category: 'Dairy',
      state: 'Gujarat',
      district: 'Ahmedabad',
      village: 'Sanand',
      harvestingStatus: 'Daily'
    },
    {
      id: 3,
      name: 'Chicken',
      price: 12.99,
      rating: 4,
      reviews: 200,
      description: 'Chicken from local ranches.',
      image:
        'https://www.deheuskidzz.com/siteassets/poultry/chicken-chefkok-whole-deheus-kidzz.png?mode=crop&width=593',
      category: 'Meat',
      state: 'Punjab',
      district: 'Ludhiana',
      village: 'Khanna',
      harvestingStatus: 'Available'
    },
    {
      id: 4,
      name: 'Organic Kale',
      price: 3.99,
      rating: 4,
      reviews: 150,
      description: 'Nutrient-rich organic kale.',
      image: 'https://urbanagrifarms.com/wp-content/uploads/2021/01/kale1.jpeg',
      category: 'Vegetables',
      state: 'Karnataka',
      district: 'Bangalore Rural',
      village: 'Doddaballapur',
      harvestingStatus: 'Fresh Pick'
    },
    {
      id: 5,
      name: 'Artisanal Cheese',
      price: 8.99,
      rating: 5,
      reviews: 75,
      description: 'Handcrafted artisanal cheese.',
      image:
        'https://www.bigbasket.com/media/uploads/p/l/40240135_2-akshayakalpa-organic-artisan-cheese-slices-pure-without-preservatives.jpg',
      category: 'Dairy',
      state: 'Tamil Nadu',
      district: 'Nilgiris',
      village: 'Ooty',
      harvestingStatus: 'Aged'
    },
    {
      id: 6,
      name: 'Honey',
      price: 6.99,
      rating: 4,
      reviews: 95,
      description: 'Raw, unfiltered local honey.',
      image:
        'https://www.harniva.com/assets/backend/admin/plugins/source/hakkimizda/kalitelibal.png',
      category: 'Sweeteners',
      state: 'Uttarakhand',
      district: 'Dehradun',
      village: 'Chakrata',
      harvestingStatus: 'Seasonal'
    },
    {
      id: 7,
      name: 'Fresh Tomatoes',
      price: 3.49,
      rating: 4,
      reviews: 110,
      description: 'Juicy, ripe tomatoes from local gardens.',
      image:
        'https://organicbazar.net/cdn/shop/products/Cherry-Tomato-1.jpg?v=1694167567',
      category: 'Vegetables',
      state: 'West Bengal',
      district: 'Hooghly',
      village: 'Singur',
      harvestingStatus: 'Fresh Pick'
    },
    {
      id: 8,
      name: 'Basmati Rice',
      price: 5.99,
      rating: 5,
      reviews: 88,
      description: 'Premium long-grain basmati rice.',
      image:
        'https://etimg.etb2bimg.com/thumb/msid-113339369,imgsize-123986,width-1200,height=765,overlay-etretail/food-entertainment/grocery/govt-scraps-minimum-export-price-thresholds-on-onion-basmati-rice.jpg',
      category: 'Grains',
      state: 'Haryana',
      district: 'Karnal',
      village: 'Taraori',
      harvestingStatus: 'Available'
    },
    {
      id: 9,
      name: 'Organic Apples',
      price: 2.99,
      rating: 4,
      reviews: 120,
      description: 'Fresh, locally grown organic apples.',
      image:
        'https://5.imimg.com/data5/UM/DM/MY-43685925/organic-apple-1000x1000.jpg',
      category: 'Fruits',
      state: 'Maharashtra',
      district: 'Pune',
      village: 'Khed',
      harvestingStatus: 'Ready'
    },
    {
      id: 10,
      name: 'Free-range Eggs',
      price: 4.99,
      rating: 5,
      reviews: 85,
      description: 'Farm-fresh free-range eggs.',
      image:
        'https://www.cookandbutcher.co.uk/wp-content/uploads/2021/02/6-eggs-resized-min.jpg',
      category: 'Dairy',
      state: 'Gujarat',
      district: 'Ahmedabad',
      village: 'Sanand',
      harvestingStatus: 'Daily'
    },
    {
      id: 11,
      name: 'Chicken',
      price: 12.99,
      rating: 4,
      reviews: 200,
      description: 'Chicken from local ranches.',
      image:
        'https://www.deheuskidzz.com/siteassets/poultry/chicken-chefkok-whole-deheus-kidzz.png?mode=crop&width=593',
      category: 'Meat',
      state: 'Punjab',
      district: 'Ludhiana',
      village: 'Khanna',
      harvestingStatus: 'Available'
    },
    {
      id: 12,
      name: 'Organic Kale',
      price: 3.99,
      rating: 4,
      reviews: 150,
      description: 'Nutrient-rich organic kale.',
      image: 'https://urbanagrifarms.com/wp-content/uploads/2021/01/kale1.jpeg',
      category: 'Vegetables',
      state: 'Karnataka',
      district: 'Bangalore Rural',
      village: 'Doddaballapur',
      harvestingStatus: 'Fresh Pick'
    },
    {
      id: 13,
      name: 'Artisanal Cheese',
      price: 8.99,
      rating: 5,
      reviews: 75,
      description: 'Handcrafted artisanal cheese.',
      image:
        'https://www.bigbasket.com/media/uploads/p/l/40240135_2-akshayakalpa-organic-artisan-cheese-slices-pure-without-preservatives.jpg',
      category: 'Dairy',
      state: 'Tamil Nadu',
      district: 'Nilgiris',
      village: 'Ooty',
      harvestingStatus: 'Aged'
    },
    {
      id: 14,
      name: 'Honey',
      price: 6.99,
      rating: 4,
      reviews: 95,
      description: 'Raw, unfiltered local honey.',
      image:
        'https://www.harniva.com/assets/backend/admin/plugins/source/hakkimizda/kalitelibal.png',
      category: 'Sweeteners',
      state: 'Uttarakhand',
      district: 'Dehradun',
      village: 'Chakrata',
      harvestingStatus: 'Seasonal'
    },
    {
      id: 15,
      name: 'Fresh Tomatoes',
      price: 3.49,
      rating: 4,
      reviews: 110,
      description: 'Juicy, ripe tomatoes from local gardens.',
      image:
        'https://organicbazar.net/cdn/shop/products/Cherry-Tomato-1.jpg?v=1694167567',
      category: 'Vegetables',
      state: 'West Bengal',
      district: 'Hooghly',
      village: 'Singur',
      harvestingStatus: 'Fresh Pick'
    },
    {
      id: 16,
      name: 'Basmati Rice',
      price: 5.99,
      rating: 5,
      reviews: 88,
      description: 'Premium long-grain basmati rice.',
      image:
        'https://etimg.etb2bimg.com/thumb/msid-113339369,imgsize-123986,width-1200,height=765,overlay-etretail/food-entertainment/grocery/govt-scraps-minimum-export-price-thresholds-on-onion-basmati-rice.jpg',
      category: 'Grains',
      state: 'Haryana',
      district: 'Karnal',
      village: 'Taraori',
      harvestingStatus: 'Available'
    }
  ]

  const categories = [
    'All',
    'Fruits',
    'Vegetables',
    'Dairy',
    'Meat',
    'Sweeteners',
    'Grains'
  ]
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
    fetchStates()
  }, [])

  useEffect(() => {
    if (selectedState) {
      fetchDistricts(selectedState)
    }
  }, [selectedState])

  useEffect(() => {
    if (selectedDistrict) {
      fetchVillages(selectedState, selectedDistrict)
    }
  }, [selectedDistrict])

  const fetchStates = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('https://api.example.com/states')
      const data = await response.json()
      setStates(data)
    } catch (error) {
      console.error('Error fetching states:', error)
      // Fallback to some default states
      setStates([
        'Maharashtra',
        'Gujarat',
        'Punjab',
        'Karnataka',
        'Tamil Nadu',
        'Uttarakhand',
        'West Bengal',
        'Haryana'
      ])
    }
  }

  const fetchDistricts = async state => {
    try {
      // Replace with actual API call
      const response = await fetch(
        `https://api.example.com/districts?state=${state}`
      )
      const data = await response.json()
      setDistricts(data)
    } catch (error) {
      console.error('Error fetching districts:', error)
      // Fallback to some default districts
      setDistricts(['District 1', 'District 2', 'District 3'])
    }
  }

  const fetchVillages = async (state, district) => {
    try {
      // Replace with actual API call
      const response = await fetch(
        `https://api.example.com/villages?state=${state}&district=${district}`
      )
      const data = await response.json()
      setVillages(data)
    } catch (error) {
      console.error('Error fetching villages:', error)
      // Fallback to some default villages
      setVillages(['Village 1', 'Village 2', 'Village 3'])
    }
  }

  const filteredProducts = products.filter(
    product =>
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      (selectedState === '' || product.state === selectedState) &&
      (selectedDistrict === '' || product.district === selectedDistrict) &&
      (selectedVillage === '' || product.village === selectedVillage) &&
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
    <div className='container mx-auto px-10 sm:px-2 py-8'>
      <div className='flex flex-col md:flex-row justify-between items-start mb-8 relative'>
        <div className='w-full md:w-64 mb-4 md:mb-0'>
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
        <div className='w-full md:w-auto relative'>
          <motion.button
            className='flex items-center justify-between w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300'
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
                        setTempVillage('')
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
                        setTempVillage('')
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
                      Village
                    </label>
                    <select
                      className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={tempVillage}
                      onChange={e => setTempVillage(e.target.value)}
                      disabled={!tempDistrict}
                    >
                      <option value=''>Select Village</option>
                      {villages.map(village => (
                        <option key={village} value={village}>
                          {village}
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
                      onChange={e => setTempHarvestingStatus(e.target.value)}
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
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
      {filteredProducts.length === 0 && (
        <p className='text-center text-gray-600 mt-8'>
          No products found. Try adjusting your search or filters.
        </p>
      )}
    </div>
  )
}

export default Shop
