import React, { useState } from 'react'
import { Edit, Trash2 } from 'lucide-react'
import ProductCard from './ProductCard'

const VendorProductCard = ({ product, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editedProduct, setEditedProduct] = useState(product)

  const handleEdit = () => {
    onEdit(editedProduct)
    setIsModalOpen(false)
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-4'>
      <ProductCard product={product} />
      <div className='flex justify-between mt-6'>
        <button
          onClick={() => setIsModalOpen(true)}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          <Edit size={18} className='inline mr-2' />
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
        >
          <Trash2 size={18} className='inline mr-2' />
          Delete
        </button>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md max-h-[75vh] overflow-y-auto'>
            <div className='flex justify-between'>
              <h2 className='text-2xl font-bold mb-4'>Edit Product</h2>
              <button
                type='button'
                onClick={() => setIsModalOpen(false)}
                className='bg-white text-black px-4 py-2 rounded-2xl mr-2 hover:bg-red-600 border-2 border-black hover:text-white'
              >
                <b>X</b>
              </button>
            </div>
            <form
              onSubmit={e => {
                e.preventDefault()
                handleEdit()
              }}
            >
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='name'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  value={editedProduct.name}
                  onChange={e =>
                    setEditedProduct({ ...editedProduct, name: e.target.value })
                  }
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='description'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  value={editedProduct.description}
                  onChange={e =>
                    setEditedProduct({
                      ...editedProduct,
                      description: e.target.value
                    })
                  }
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='price'
                >
                  Price
                </label>
                <input
                  type='number'
                  id='price'
                  value={editedProduct.price}
                  onChange={e =>
                    setEditedProduct({
                      ...editedProduct,
                      price: parseFloat(e.target.value)
                    })
                  }
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='quantity'
                >
                  Quantity
                </label>
                <input
                  type='number'
                  id='quantity'
                  value={editedProduct.quantity}
                  onChange={e =>
                    setEditedProduct({
                      ...editedProduct,
                      quantity: parseInt(e.target.value)
                    })
                  }
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='category'
                >
                  Category
                </label>
                <input
                  type='text'
                  id='category'
                  value={editedProduct.category}
                  onChange={e =>
                    setEditedProduct({
                      ...editedProduct,
                      category: e.target.value
                    })
                  }
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='subcategory'
                >
                  Subcategory
                </label>
                <input
                  type='text'
                  id='subcategory'
                  value={editedProduct.subcategory}
                  onChange={e =>
                    setEditedProduct({
                      ...editedProduct,
                      subcategory: e.target.value
                    })
                  }
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='image'
                >
                  Image URL
                </label>
                <input
                  type='text'
                  id='image'
                  value={editedProduct.image}
                  onChange={e =>
                    setEditedProduct({
                      ...editedProduct,
                      image: e.target.value
                    })
                  }
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='status'
                >
                  Status
                </label>
                <select
                  id='status'
                  value={editedProduct.status}
                  onChange={e =>
                    setEditedProduct({
                      ...editedProduct,
                      status: e.target.value
                    })
                  }
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                >
                  <option value='in-stock'>In Stock</option>
                  <option value='out-of-stock'>Out of Stock</option>
                  <option value='discontinued'>Discontinued</option>
                </select>
              </div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default VendorProductCard
