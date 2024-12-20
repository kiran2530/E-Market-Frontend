import React, { useState, useEffect } from 'react'
import VendorProductCard from './VendorProductCard'
import Loader from '../../common/loader/Loader'
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProductListing = () => {
  const [products, setProducts] = useState([])

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    console.log('fetching')
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `${backendUrl}/api/product/vendor/getProducts`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authToken: localStorage.getItem('authToken')
          }
        }
      )

      const data = await response.json()

      if (data.success) {
        setProducts(data.product)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = editedProduct => {
    setProducts(
      products.map(p => (p.id === editedProduct.id ? editedProduct : p))
    )
  }

  const handleDelete = productId => {
    setProducts(products.filter(p => p._id !== productId))
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='container mx-auto px-4 sm:px-2 '>
          <h2 className='text-2xl font-bold mb-4'>Your Products</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {products.map(product => (
              <VendorProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ProductListing
