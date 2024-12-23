import React, { useState, useContext } from 'react'
import styles from './Modal.module.css'
const backendUrl = import.meta.env.VITE_BACKEND_URL
import alertContext from '../../../context/alert/alertContext'
import { X } from 'lucide-react'

const LoginModal = ({ onClose, onLogin }) => {
  // --------- Veriables, state and hooks declarations --------

  //  create an state for hold the details of the login user
  const [role, setRole] = useState('')
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  // use alertCotext using useContext hook to show alert message
  const { showAlert } = useContext(alertContext)

  // ---------------------- Functions ------------------------

  // onchange function handles inputs and set the userDetails state
  const onchange = e => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })
  }

  // handleLogin function handle the login functionality.
  const handleLogin = async userRole => {
    if (loginDetails.email === '' || loginDetails.password === '') {
      showAlert("Enter Correct Email I'd & Password", 'warning')
      return
    }
    setIsLoading(true)
    let url = ''
    if (userRole === 'vendor') {
      url = `${backendUrl}/api/auth/vendor/login`
    }
    if (userRole === 'buyer') {
      url = `${backendUrl}/api/auth/buyer/login`
    }

    try {
      const token = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: loginDetails.email,
          password: loginDetails.password
        })
      })

      const tokenData = await token.json()

      if (tokenData.success) {
        localStorage.setItem('authToken', tokenData.authToken)
        localStorage.setItem('role', tokenData.role)
        // console.log('Login Successfully')
        showAlert('Login Successfully', 'success')
        setLoginDetails({})
        onLogin(userRole)
      } else {
        console.log(tokenData.message)
        showAlert(tokenData.message, 'danger')
      }
    } catch (err) {
      showAlert('Internal server error', 'danger')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h1 className='text-3xl mb-4 text-center font-bold'>LOGIN</h1>

        <button
          onClick={onClose}
          className='absolute p-1 rounded-full bg-gray-200 hover:bg-gray-400 focus:outline-none top-2 right-2'
          aria-label='Close'
        >
          <X className='w-6 h-6 text-red-600' />
        </button>

        <form onSubmit={e => e.preventDefault()}>
          <div className={styles.inputGroup}>
            <label htmlFor='' className='text-lg font-semibold'>
              Email
            </label>
            <input
              type='text'
              placeholder='Email'
              className={styles.inputField}
              name='email'
              value={loginDetails.email}
              onChange={onchange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor='' className='text-lg font-semibold'>
              Password
            </label>
            <input
              type='password'
              placeholder='Password'
              className={styles.inputField}
              name='password'
              value={loginDetails.password}
              onChange={onchange}
              required
            />
          </div>
          <div className='flex' >
            <button
              className={
                !isLoading
                  ? styles.modalButton
                  : 'bg-red-400 py-2 rounded my-2 cursor-wait'
              }
              onClick={() => {
                setRole('buyer')
                handleLogin('buyer')
              }}
            >
              Login as Buyer
            </button>
            <button
              className={
                !isLoading
                  ? styles.modalButton
                  : 'bg-red-400 py-2 rounded my-2 cursor-wait'
              }
              onClick={() => {
                setRole('vendor')
                handleLogin('vendor')
              }}
              disabled={isLoading}
            >
              Login as Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginModal
