import { createContext, useState, useEffect, useContext } from 'react'
import alertContext from '../alert/alertContext'

const backendUrl = import.meta.env.VITE_BACKEND_URL

// Create the context
export const VendorContext = createContext()

// Create the provider component
export const VendorProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null)

  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  const getVendorData = async () => {
    try {
      // fetching vendor data
      const response = await fetch(`${backendUrl}/api/auth/vendor/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authToken: localStorage.getItem('authToken')
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to add item: ${response.statusText}`)
      }
      const data = await response.json()
      setVendor(data.vendorDetails)
    } catch (error) {
      showAlert('Failed to fetch vendor', 'danger')
    } finally {
    }
  }

  useEffect(() => {
    if (localStorage.getItem('role') === 'vendor') {
      getVendorData()
    }
  }, [])

  return (
    <VendorContext.Provider value={{ vendor, getVendorData }}>
      {children}
    </VendorContext.Provider>
  )
}
