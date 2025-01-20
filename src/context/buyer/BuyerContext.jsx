import { createContext, useState, useEffect, useContext } from 'react'
import alertContext from '../alert/alertContext'

const backendUrl = import.meta.env.VITE_BACKEND_URL

// Create the context
export const BuyerContext = createContext()

// Create the provider component
export const BuyerProvider = ({ children }) => {
  const [buyer, setBuyer] = useState(null)

  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  const getBuyerData = async () => {
    try {
      console.log('in buyer data')

      // fetching buyer data
      const response = await fetch(`${backendUrl}/api/cart/info`, {
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
      console.log(data)
      setBuyer(data)
    } catch (error) {
      showAlert('Failed to fetch buyer', 'danger')
    } finally {
    }
  }

  useEffect(() => {
    getBuyerData()
  }, [])

  return (
    <BuyerContext.Provider value={{ buyer, getBuyerData }}>
      {children}
    </BuyerContext.Provider>
  )
}
