import React from 'react'
import nosotrosStyle from './nosotros.module.css'

export const NosotrosCard = ({
  id,
  title,
  description,
}) => {
  
  const nosotrosImgUrl = `/backgrounds/${ id }.jpg`

  return (
    <div className={nosotrosStyle.card}>
      <div className={nosotrosStyle.cardIco} style={{
        backgroundImage: `url(${nosotrosImgUrl})`,
        height: '50%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}></div>
      <div className={nosotrosStyle.innterText}>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </div>
  )
}