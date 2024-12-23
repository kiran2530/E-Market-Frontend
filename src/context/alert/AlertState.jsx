import React, { useState } from 'react'
import alertContext from './alertContext'

const alertState = props => {
  // the alert structure is alert = {massage: "", type:""}

  const [alert, setAlert] = useState()

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }

  return (
    <alertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </alertContext.Provider>
  )
}

export default alertState
