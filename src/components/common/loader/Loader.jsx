import React from 'react'
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div class={styles.dot_spinner}>
        <div class={styles.dot_spinner__dot}></div>
        <div class={styles.dot_spinner__dot}></div>
        <div class={styles.dot_spinner__dot}></div>
        <div class={styles.dot_spinner__dot}></div>
        <div class={styles.dot_spinner__dot}></div>
        <div class={styles.dot_spinner__dot}></div>
        <div class={styles.dot_spinner__dot}></div>
        <div class={styles.dot_spinner__dot}></div>
      </div>
    </div>
  )
}

export default Loader
