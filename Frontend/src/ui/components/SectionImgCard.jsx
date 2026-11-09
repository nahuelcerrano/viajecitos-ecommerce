import React from 'react'

export const SectionImgCard = ({ id }) => {  

  const icoImageUrl = `/ico/${id}.jpg`
  
  return (

    <div className='relative h-[195px] w-1/6 overflow-hidden bg-white text-white'>
      <div
        className='h-full bg-cover bg-center'
        style={{ backgroundImage: `url(${icoImageUrl})` }}
      >
      </div>
    </div>
  )
}
