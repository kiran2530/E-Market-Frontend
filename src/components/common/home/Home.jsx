import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css' // Importing the CSS module
import homeHeader from '../../../assets/home-header.png'
import Loader from '../loader/Loader'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading ? (
        // Replace with a loading spinner or animation
        <Loader />
      ) : (
        <div className={styles.homeContainer}>
          <header className={styles.homeHeader}>
            <div className={styles.textContainer}>
              <h1 className={styles.homeTitle}>
                Welcome to <strong style={{ color: 'blue' }}>E-Market</strong>
              </h1>
              <p className={styles.homeDescription}>
                Find the best products from trusted vendors and enjoy a seamless
                shopping experience. Shop now and enjoy exclusive offers!
              </p>
              <div className={styles.homeButtons}>
                <Link
                  to='/shop'
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  Shop Now
                </Link>
                <Link
                  to='/signup'
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* New image */}
            <div className={styles.imageContainer}>
              <img
                src={homeHeader}
                alt='Farmers Market'
                className={styles.homeImage}
              />
            </div>
          </header>

          <section className={styles.featureContainer}>
            <h1 className={styles.homeTitle}>
              Our <strong style={{ color: 'blue' }}>Services</strong>
            </h1>
            <div className={styles.homeFeatures}>
              <div className={styles.feature}>
                <h2>For Buyers</h2>
                <p>
                  Browse through a wide range of products, manage your cart, and
                  check out with ease.
                </p>
              </div>
              <div className={styles.feature}>
                <h2>For Vendors</h2>
                <p>
                  Manage your products, track sales, and connect with potential
                  buyers effortlessly.
                </p>
              </div>
              <div className={styles.feature}>
                <h2>For Vendors</h2>
                <p>
                  Manage your products, track sales, and connect with potential
                  buyers effortlessly.
                </p>
              </div>
              <div className={styles.feature}>
                <h2>For Vendors</h2>
                <p>
                  Manage your products, track sales, and connect with potential
                  buyers effortlessly.
                </p>
              </div>
              <div className={styles.feature}>
                <h2>For Vendors</h2>
                <p>
                  Manage your products, track sales, and connect with potential
                  buyers effortlessly.
                </p>
              </div>
            </div>
          </section>

          <footer className={styles.homeFooter}>
            <p>
              &copy; {new Date().getFullYear()} E-Market Platform. All rights
              reserved.
            </p>
          </footer>
        </div>
      )}
    </>
  )
}

export default Home
