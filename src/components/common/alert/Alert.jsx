import React, { useContext } from 'react'
import alertContext from '../../../context/alert/alertContext'
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react'

const Alert = () => {
  const { alert } = useContext(alertContext)

  if (alert != null) {
    return (
      <div
        className={`fixed top-2 left-1/2 transform -translate-x-1/2 z-50 w-3/5 sm:w-2/5 text-center px-4 py-3 border rounded-md shadow-lg 
        ${
          alert.type === 'success'
            ? 'bg-green-200 border-green-300 text-green-700'
            : alert.type === 'danger'
            ? 'bg-red-200 border-red-300 text-red-700'
            : alert.type === 'warning'
            ? 'bg-yellow-200 border-yellow-300 text-yellow-700'
            : 'bg-blue-200 border-blue-300 text-blue-700'
        }`}
        role='alert'
      >
        <strong className='flex items-center justify-center text-sm sm:text-base'>
          {alert.type === 'success' ? (
            <CheckCircle className='text-green-700 w-5 h-5 mr-2' />
          ) : alert.type === 'warning' ? (
            <Clock className='text-yellow-700 w-5 h-5 mr-2' />
          ) : alert.type === 'danger' ? (
            <AlertTriangle className='text-red-700 w-5 h-5 mr-2' />
          ) : (
            ''
          )}
          {alert.massage}
        </strong>
      </div>
    )
  }
  return null // Ensure it returns null when alert is null
}

export default Alert
