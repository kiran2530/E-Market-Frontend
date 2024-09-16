import React, { useState } from 'react'

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    subcategory: '',
    image: '',
    status: 'in-stock'
  })

  const handleSubmit = e => {
    e.preventDefault()
    // Here you would typically send the product data to your backend
    console.log('New product:', product)
    // Reset the form
    setProduct({
      name: '',
      description: '',
      price: '',
      quantity: '',
      category: '',
      subcategory: '',
      image: '',
      status: 'in-stock'
    })
  }

  return (
    <div className='max-w-2xl mx-auto px-4 py-4'>
      <h2 className='text-2xl font-bold mb-4'>Add New Product</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            value={product.name}
            onChange={e => setProduct({ ...product, name: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='description'
          >
            Description
          </label>
          <textarea
            id='description'
            value={product.description}
            onChange={e =>
              setProduct({ ...product, description: e.target.value })
            }
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='price'
          >
            Price
          </label>
          <input
            type='number'
            id='price'
            value={product.price}
            onChange={e => setProduct({ ...product, price: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='quantity'
          >
            Quantity
          </label>
          <input
            type='number'
            id='quantity'
            value={product.quantity}
            onChange={e => setProduct({ ...product, quantity: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='category'
          >
            Category
          </label>
          <input
            type='text'
            id='category'
            value={product.category}
            onChange={e => setProduct({ ...product, category: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='subcategory'
          >
            Subcategory
          </label>
          <input
            type='text'
            id='subcategory'
            value={product.subcategory}
            onChange={e =>
              setProduct({ ...product, subcategory: e.target.value })
            }
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='image'
          >
            Image URL
          </label>
          <input
            type='file'
            id='image'
            value={product.image}
            onChange={e => setProduct({ ...product, image: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='status'
          >
            Status
          </label>
          <select
            id='status'
            value={product.status}
            onChange={e => setProduct({ ...product, status: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          >
            <option value='in-stock'>In Stock</option>
            <option value='out-of-stock'>Out of Stock</option>
            <option value='discontinued'>Discontinued</option>
          </select>
        </div>
        <div>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
