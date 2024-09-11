import React from 'react'

const AddProduct = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Add Product</h1>
      <p style={styles.text}>
        This page is not fully designed yet. Stay tuned for updates!
      </p>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    border: '2px dashed #ccc',
    borderRadius: '10px',
    marginTop: '50px'
  },
  heading: {
    color: '#ff6600',
    fontSize: '24px'
  },
  text: {
    color: '#555',
    fontSize: '18px'
  }
}

export default AddProduct
