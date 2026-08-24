import React from 'react'
import imgSection from './footer.module.css'

export const SectionImgCard = ({ id }) => {  

  const icoImageUrl = `/ico/${id}.jpg`
  
  return (

    <div className={`${imgSection.cardSection}` }>
      <div style={{
        backgroundImage: `url(${icoImageUrl})`,
        height: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
      </div>
    </div>
  )
}