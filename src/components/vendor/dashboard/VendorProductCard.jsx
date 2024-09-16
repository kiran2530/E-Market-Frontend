import { useState } from 'react'
import { Card, CardContent, CardFooter } from './CustomUIComponents'
import { Button } from './CustomUIComponents'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './CustomUIComponents'
import { ScrollArea } from './CustomUIComponents'
import { Input, Label, Textarea } from './CustomUIComponents'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './CustomUIComponents'

export default function VendorProductCard ({ product, onEdit, onDelete }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editedProduct, setEditedProduct] = useState(product)

  const handleEdit = () => {
    onEdit(editedProduct)
    setIsEditModalOpen(false)
  }

  return (
    <Card className='w-full'>
      <CardContent className='p-4'>
        <img
          src={product.image}
          alt={product.name}
          className='w-full h-48 object-cover mb-4 rounded-md'
        />
        <h3 className='text-lg font-semibold mb-2'>{product.name}</h3>
        <p className='text-sm text-gray-600 mb-2'>
          ${product.price.toFixed(2)}
        </p>
        <p className='text-sm text-gray-500'>{product.description}</p>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button variant='outline'>Edit</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <ScrollArea className='max-h-[80vh] overflow-y-auto'>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-right'>
                    Name
                  </Label>
                  <Input
                    id='name'
                    value={editedProduct.name}
                    onChange={e =>
                      setEditedProduct({
                        ...editedProduct,
                        name: e.target.value
                      })
                    }
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='description' className='text-right'>
                    Description
                  </Label>
                  <Textarea
                    id='description'
                    value={editedProduct.description}
                    onChange={e =>
                      setEditedProduct({
                        ...editedProduct,
                        description: e.target.value
                      })
                    }
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='price' className='text-right'>
                    Price
                  </Label>
                  <Input
                    id='price'
                    type='number'
                    value={editedProduct.price}
                    onChange={e =>
                      setEditedProduct({
                        ...editedProduct,
                        price: parseFloat(e.target.value)
                      })
                    }
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='quantity' className='text-right'>
                    Quantity
                  </Label>
                  <Input
                    id='quantity'
                    type='number'
                    value={editedProduct.quantity}
                    onChange={e =>
                      setEditedProduct({
                        ...editedProduct,
                        quantity: parseInt(e.target.value)
                      })
                    }
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='category' className='text-right'>
                    Category
                  </Label>
                  <Select
                    value={editedProduct.category}
                    onValueChange={value =>
                      setEditedProduct({ ...editedProduct, category: value })
                    }
                  >
                    <SelectTrigger className='col-span-3'>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='electronics'>Electronics</SelectItem>
                      <SelectItem value='clothing'>Clothing</SelectItem>
                      <SelectItem value='books'>Books</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='subcategory' className='text-right'>
                    Subcategory
                  </Label>
                  <Input
                    id='subcategory'
                    value={editedProduct.subcategory}
                    onChange={e =>
                      setEditedProduct({
                        ...editedProduct,
                        subcategory: e.target.value
                      })
                    }
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='image' className='text-right'>
                    Image URL
                  </Label>
                  <Input
                    id='image'
                    value={editedProduct.image}
                    onChange={e =>
                      setEditedProduct({
                        ...editedProduct,
                        image: e.target.value
                      })
                    }
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='status' className='text-right'>
                    Status
                  </Label>
                  <Select
                    value={editedProduct.status}
                    onValueChange={value =>
                      setEditedProduct({ ...editedProduct, status: value })
                    }
                  >
                    <SelectTrigger className='col-span-3'>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='in-stock'>In Stock</SelectItem>
                      <SelectItem value='out-of-stock'>Out of Stock</SelectItem>
                      <SelectItem value='discontinued'>Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleEdit}>Save changes</Button>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <Button variant='destructive' onClick={() => onDelete(product.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
