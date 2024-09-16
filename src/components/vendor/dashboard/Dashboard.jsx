import { useState } from 'react'
import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom'
import { Button } from './CustomUIComponents'
import {
  Package,
  PlusCircle,
  BarChart2,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Products from './Products'
import AddProduct from './AddProduct'
import Analytics from './Analytics'
import Customers from './Customers'
import SettingsComponent from './Settings'
import { ScrollArea } from './CustomUIComponents'
import VendorProductCard from './VendorProductCard'

export default function Dashboard () {
  const [activeRoute, setActiveRoute] = useState('products')
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

  const sidebarItems = [
    { icon: Package, label: 'Products', route: 'products' },
    { icon: PlusCircle, label: 'Add Product', route: 'add-product' },
    { icon: BarChart2, label: 'Analytics', route: 'analytics' },
    { icon: Users, label: 'Customers', route: 'customers' },
    { icon: Settings, label: 'Settings', route: 'settings' }
  ]

  const handleEdit = editedProduct => {
    setProducts(
      products.map(p => (p.id === editedProduct.id ? editedProduct : p))
    )
  }

  const handleDelete = productId => {
    setProducts(products.filter(p => p.id !== productId))
  }

  const handleAddProduct = newProduct => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }])
    setActiveRoute('products')
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      <aside className='bg-white w-64 min-h-screen p-4'>
        <nav className='mt-8'>
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant={activeRoute === item.route ? 'secondary' : 'ghost'}
              className='w-full justify-start mb-2'
              onClick={() => setActiveRoute(item.route)}
            >
              <item.icon className='mr-2 h-4 w-4' />
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>
      <main className='flex-1 p-6 overflow-hidden'>
        <ScrollArea className='h-[calc(100vh-80px)]'>
          {activeRoute === 'products' && (
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
          )}
          {activeRoute === 'add-product' && (
            <AddProduct onAddProduct={handleAddProduct} />
          )}
          {activeRoute === 'analytics' && (
            <h2 className='text-2xl font-bold'>Analytics (Coming Soon)</h2>
          )}
          {activeRoute === 'customers' && (
            <h2 className='text-2xl font-bold'>Customers (Coming Soon)</h2>
          )}
          {activeRoute === 'settings' && (
            <h2 className='text-2xl font-bold'>Settings (Coming Soon)</h2>
          )}
        </ScrollArea>
      </main>
    </div>
  )
}
