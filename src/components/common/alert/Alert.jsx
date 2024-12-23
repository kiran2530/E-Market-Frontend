import React, { useContext, useEffect, useState } from 'react'
import alertContext from '../../../context/alert/alertContext'
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react'

const Alert = () => {
  const { alert } = useContext(alertContext)
  const [progress, setProgress] = useState(100)
  let intervalRef = null // Reference to the interval
  let timeoutRef = null // Reference to the timeout

  const clearAlert = () => {
    setProgress(0) // Reset progress bar
    if (alertContext.clearAlert) {
      alertContext.clearAlert() // Clear the alert from the context
    }
  }

  useEffect(() => {
    if (alert) {
      // Clear previous timers if they exist
      if (intervalRef) clearInterval(intervalRef)
      if (timeoutRef) clearTimeout(timeoutRef)

      // Reset progress and start a new cycle
      setProgress(100)

      intervalRef = setInterval(() => {
        setProgress(prev => {
          if (prev <= 0) {
            clearInterval(intervalRef) // Stop the progress bar at 100%
            return 100
          }
          return prev - 5 // Increase progress every 100ms
        })
      }, 100)

      timeoutRef = setTimeout(() => {
        clearAlert() // Clear the alert after 2 seconds
      }, 2000)

      return () => {
        clearInterval(intervalRef)
        clearTimeout(timeoutRef)
      }
    }
  }, [alert])

  if (!alert) return null

  return (
    <div
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 w-3/5 sm:w-2/5 text-center px-4 py-2 border rounded-md shadow-lg 
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
      {/* Countdown Bar */}
      <div
        className={`h-1 mb-2 rounded-full ${
          alert.type === 'success'
            ? 'bg-green-500'
            : alert.type === 'danger'
            ? 'bg-red-500'
            : alert.type === 'warning'
            ? 'bg-yellow-500'
            : 'bg-blue-500'
        }`}
        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
      ></div>

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
        {alert.message}
      </strong>
    </div>
  )
}

export default Alert
