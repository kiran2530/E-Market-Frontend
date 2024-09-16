import { useState } from 'react'
import VendorProductCard from './VendorProductCard'

export default function Products () {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 19.99,
      description: 'Description for Product 1',
      quantity: 100,
      category: 'electronics',
      subcategory: 'smartphones',
      image: '/placeholder.svg?height=192&width=256',
      status: 'in-stock'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 29.99,
      description: 'Description for Product 2',
      quantity: 50,
      category: 'clothing',
      subcategory: 't-shirts',
      image: '/placeholder.svg?height=192&width=256',
      status: 'in-stock'
    }
  ])

  const handleEdit = editedProduct => {
    setProducts(
      products.map(p => (p.id === editedProduct.id ? editedProduct : p))
    )
  }

  const handleDelete = productId => {
    setProducts(products.filter(p => p.id !== productId))
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {products.map(product => (
        <VendorProductCard
          key={product.id}
          product={product}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
