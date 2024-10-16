import React, { useState } from 'react'
import VendorProductCard from './VendorProductCard'

const ProductListing = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Organic Apples',
      price: 2.99,
      rating: 4,
      reviews: 120,
      description: 'Fresh, locally grown organic apples.',
      image: {
        imageUrl:
          'https://5.imimg.com/data5/UM/DM/MY-43685925/organic-apple-1000x1000.jpg'
      },
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
      image: {
        imageUrl:
          'https://www.cookandbutcher.co.uk/wp-content/uploads/2021/02/6-eggs-resized-min.jpg'
      },
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
      image: {
        imageUrl:
          'https://www.deheuskidzz.com/siteassets/poultry/chicken-chefkok-whole-deheus-kidzz.png?mode=crop&width=593'
      },
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
      image: {
        imageUrl:
          'https://urbanagrifarms.com/wp-content/uploads/2021/01/kale1.jpeg'
      },
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
      image: {
        imageUrl:
          'https://www.bigbasket.com/media/uploads/p/l/40240135_2-akshayakalpa-organic-artisan-cheese-slices-pure-without-preservatives.jpg'
      },
      category: 'Dairy',
      state: 'Tamil Nadu',
      district: 'Nilgiris',
      village: 'Ooty',
      harvestingStatus: 'Aged'
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
    <div className='container mx-auto px-4 sm:px-2 py-8'>
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
  )
}

export default ProductListing
