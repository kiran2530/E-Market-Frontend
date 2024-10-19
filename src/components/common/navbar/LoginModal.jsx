import React, { useState } from 'react'
import styles from './Modal.module.css'

const LoginModal = ({ onClose, onLogin }) => {
  // --------- Veriables, state and hooks declarations --------

  //  create an state for hold the details of the login user
  const [role, setRole] = useState('')
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  // ---------------------- Functions ------------------------

  // onchange function handles inputs and set the userDetails state
  const onchange = e => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })
  }

  // handleLogin function handle the login functionality.
  const handleLogin = async userRole => {
    setIsLoading(true)
    let url = ''
    if (userRole === 'vendor') {
      url = 'https://e-market-backend-s5ap.onrender.com/api/auth/vendor/login'
    }
    if (userRole === 'buyer') {
      url = 'https://e-market-backend-s5ap.onrender.com/api/auth/buyer/login'
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
        console.log(tokenData)
        setLoginDetails({})
        onLogin(userRole)
      } else {
        console.log(tokenData.message)
      }
    } catch (err) {
      console.log('Internal server error')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Login</h2>
        <form onSubmit={e => e.preventDefault()}>
          <div className={styles.inputGroup}>
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
          <button onClick={onClose} className={styles.modalCloseButton}>
            Close
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal
