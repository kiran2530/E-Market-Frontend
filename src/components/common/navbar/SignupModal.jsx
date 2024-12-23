import React, { useState,useContext } from 'react'
import styles from './Modal.module.css'
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import alertContext from '../../../context/alert/alertContext'

const SignupModal = ({ onClose, onSignup }) => {
  // --------- Veriables, state and hooks declarations --------

  //  create an state for hold the details of the signup user
  const [role, setRole] = useState('')
  const [signupDetails, setSignupDetails] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  })

  // use as go to the back or next page using navigate('pathname')
  //   let navigate = useNavigate()

  // use alertCotext using useContext hook to show alert message
    const { showAlert } = useContext(alertContext)

  // ---------------------- Functions ------------------------
  // onchange function handles inputs and set the userDetails state

  const onchange = e => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value })
  }

  // handling the signup for new user and save the auth-token into the local storage

  const handleSignup = async userRole => {
    let url = ''
    if (userRole === 'vendor') {
      url =
        `${backendUrl}/api/auth/vendor/register`
    }
    if (userRole === 'buyer') {
      url = `${backendUrl}/api/auth/buyer/register`
    }

    try {
      const token = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: signupDetails.name,
          email: signupDetails.email,
          password: signupDetails.password,
          phone: signupDetails.phone,
          address: signupDetails.address
        })
      })

      const tokenData = await token.json()
      console.log(tokenData)

      if (tokenData.success) {
        setSignupDetails({})
        onSignup(userRole)
      }
    } catch (err) {
      console.log('Internal server error')
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Signup</h2>
        <form onSubmit={e => e.preventDefault()}>
          <div className={styles.inputGroup}>
            <input
              type='text'
              placeholder='Name'
              className={styles.inputField}
              required
              name='name'
              value={signupDetails.name}
              onChange={onchange}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type='email'
              placeholder='Email'
              className={styles.inputField}
              name='email'
              value={signupDetails.email}
              onChange={onchange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type='text'
              placeholder='Contact Number'
              className={styles.inputField}
              name='phone'
              value={signupDetails.phone}
              onChange={onchange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type='text'
              placeholder='Address'
              className={styles.inputField}
              name='address'
              value={signupDetails.address}
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
              value={signupDetails.password}
              onChange={onchange}
              required
            />
          </div>
          <button
            className={styles.modalButton}
            onClick={() => {
              setRole('buyer')
              handleSignup('buyer')
            }}
          >
            Signup as Buyer
          </button>
          <button
            className={styles.modalButton}
            onClick={() => {
              setRole('vendor')
              handleSignup('vendor')
            }}
          >
            Signup as Vendor
          </button>
          <button onClick={onClose} className={styles.modalCloseButton}>
            Close
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupModal
