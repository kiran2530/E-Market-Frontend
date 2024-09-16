import React from 'react'

export const Button = ({
  children,
  onClick,
  variant = 'default',
  ...props
}) => {
  const baseStyle = 'px-4 py-2 rounded font-semibold text-sm'
  const variantStyles = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    destructive: 'bg-red-500 text-white hover:bg-red-600'
  }

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export const Input = ({ ...props }) => {
  return (
    <input
      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
      {...props}
    />
  )
}

export const Label = ({ children, htmlFor, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className='block text-sm font-medium text-gray-700 mb-1'
      {...props}
    >
      {children}
    </label>
  )
}

export const Textarea = ({ ...props }) => {
  return (
    <textarea
      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
      {...props}
    />
  )
}

export const Select = ({ children, ...props }) => {
  return (
    <select
      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
      {...props}
    >
      {children}
    </select>
  )
}

export const Card = ({ children, className, ...props }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardFooter = ({ children, className, ...props }) => {
  return (
    <div className={`px-4 py-3 bg-gray-50 ${className}`} {...props}>
      {children}
    </div>
  )
}

// ScrollArea Component
export function ScrollArea ({ className = '', children }) {
  return <div className={`overflow-auto ${className}`}>{children}</div>
}

// Dialog Components
export function Dialog ({ open, onOpenChange, children }) {
  return open ? (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div
        className='fixed inset-0 bg-black opacity-50'
        onClick={() => onOpenChange(false)}
      ></div>
      <div className='relative z-10 bg-white rounded-lg shadow-lg overflow-hidden'>
        {children}
      </div>
    </div>
  ) : null
}

export function DialogTrigger ({ asChild, children }) {
  const child = React.Children.only(children)
  const childProps = {
    onClick: () => child.props.onClick && child.props.onClick()
  }

  return React.cloneElement(child, childProps)
}

export function DialogContent ({ className = '', children }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

export function DialogHeader ({ children }) {
  return <div className='mb-4'>{children}</div>
}

export function DialogTitle ({ children }) {
  return <h2 className='text-xl font-bold'>{children}</h2>
}

// Select Components
// export function Select ({ value, onValueChange, children }) {
//   return (
//     <div className='relative inline-block w-full'>
//       {React.Children.map(children, child => {
//         // Clone children to pass value and onValueChange to them
//         return React.cloneElement(child, { value, onValueChange })
//       })}
//     </div>
//   )
// }

// Define the subcomponents of Select
export function SelectTrigger ({ className = '', children, onClick }) {
  return (
    <div
      className={`cursor-pointer border p-2 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function SelectValue ({ placeholder = '', value }) {
  return <span>{value || placeholder}</span>
}

export function SelectContent ({ isOpen, children }) {
  return (
    isOpen && (
      <div className='absolute z-50 mt-1 w-full bg-white border rounded shadow-md'>
        {children}
      </div>
    )
  )
}

export function SelectItem ({ value, onValueChange, children }) {
  const handleClick = () => {
    if (onValueChange) onValueChange(value)
  }

  return (
    <div className='cursor-pointer p-2 hover:bg-gray-100' onClick={handleClick}>
      {children}
    </div>
  )
}
