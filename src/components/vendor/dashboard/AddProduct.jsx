import { useState } from 'react'
import { Button, Input, Label, Textarea, Select } from './CustomUIComponents'

export default function AddProduct () {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    subcategory: '',
    image: '',
    status: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    console.log('New product:', newProduct)
    setNewProduct({
      name: '',
      description: '',
      price: '',
      quantity: '',
      category: '',
      subcategory: '',
      image: '',
      status: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 max-w-md'>
      <div>
        <Label htmlFor='name'>Product Name</Label>
        <Input
          id='name'
          value={newProduct.name}
          onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          value={newProduct.description}
          onChange={e =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor='price'>Price</Label>
        <Input
          id='price'
          type='number'
          value={newProduct.price}
          onChange={e =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor='quantity'>Quantity</Label>
        <Input
          id='quantity'
          type='number'
          value={newProduct.quantity}
          onChange={e =>
            setNewProduct({ ...newProduct, quantity: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor='category'>Category</Label>
        <Select
          id='category'
          value={newProduct.category}
          onChange={e =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          required
        >
          <option value=''>Select category</option>
          <option value='electronics'>Electronics</option>
          <option value='clothing'>Clothing</option>
          <option value='books'>Books</option>
        </Select>
      </div>
      <div>
        <Label htmlFor='subcategory'>Subcategory</Label>
        <Input
          id='subcategory'
          value={newProduct.subcategory}
          onChange={e =>
            setNewProduct({ ...newProduct, subcategory: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor='image'>Image URL</Label>
        <Input
          id='image'
          value={newProduct.image}
          onChange={e =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor='status'>Status</Label>
        <Select
          id='status'
          value={newProduct.status}
          onChange={e =>
            setNewProduct({ ...newProduct, status: e.target.value })
          }
          required
        >
          <option value=''>Select status</option>
          <option value='in-stock'>In Stock</option>
          <option value='out-of-stock'>Out of Stock</option>
          <option value='discontinued'>Discontinued</option>
        </Select>
      </div>
      <Button type='submit'>Add Product</Button>
    </form>
  )
}
