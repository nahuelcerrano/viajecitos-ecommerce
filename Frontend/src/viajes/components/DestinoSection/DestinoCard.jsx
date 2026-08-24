import React from 'react'
import destinoStyles from './destino.module.css'

export const DestinoCard = ({
  id,
  country,
  city,
  price,
}) => {

  const destinoImageUrl = `/countries/${ id }.jpg`


  return (
    <div className={`${destinoStyles.destinations}`}>
      <div style={{
        backgroundImage: `url(${destinoImageUrl})`,
        height: '50%',
        borderRadius: '50%',
        transition: 'box-shadow 1s',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}></div>
      <div className={destinoStyles.content}>
        <strong>{ country }</strong>
        <p className={destinoStyles.desc}>{ city }</p>
      </div>
    </div>
  )
}