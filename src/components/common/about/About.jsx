import React from 'react'

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About us</h1>
      <p style={styles.text}>
        This page is not fully designed yet. Stay tuned for updates! Please try Latter!
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

export default About
