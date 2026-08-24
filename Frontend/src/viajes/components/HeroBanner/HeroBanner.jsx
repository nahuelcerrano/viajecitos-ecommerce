import React from 'react'
import styles from './heroImage.module.css'

export const HeroBanner = ({
  id,
  page,
  title,
  subtitle,
}) => {

  const heroImageUrl = `/backgrounds/${ id }.jpg`
  
  return (
    <div style={{
      backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, .35) 15%, rgba(0, 0, 0, .35) 25%), url(${heroImageUrl})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '80vh',
      position: 'relative',
      textShadow: '1px 2px 3px black'
    }}>
        {/* <img src={ heroImageUrl } alt={ page } /> */}
      <div className={styles.text}>
        <h1 className={styles.title}>{ title }</h1>
        <h2 className={styles.subtitle}>{ subtitle }</h2>
      </div>
    </div>
  )
}