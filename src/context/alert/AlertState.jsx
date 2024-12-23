import React, { useState } from 'react'
import alertContext from './alertContext'

const alertState = props => {
  // the alert structure is alert = {massage: "", type:""}

  const [alert, setAlert] = useState()

  const showAlert = (massage, type) => {
    setAlert({
      massage: massage,
      type: type
    })

    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }

  return (
    <alertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </alertContext.Provider>
  )
}

export default alertState
