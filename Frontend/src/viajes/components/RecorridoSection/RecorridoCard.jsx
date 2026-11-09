import React from 'react'

export const RecorridoCard = ({
  id,
  country,
  name,
  price,
}) => {
  
  const recorridoImageUrl = `/countries/${ id }.jpg`

  return (
    <div className='relative mb-5 h-[350px] w-[250px] cursor-pointer overflow-hidden rounded-[5px] border-[0.5px] border-surface-alt bg-white text-white'>
      <div
        className='h-full bg-cover bg-center'
        style={{ backgroundImage: `url(${recorridoImageUrl})` }}
      ></div>
      <div className='absolute bottom-[15px] mx-4 font-medium transition-opacity duration-1000 text-shadow-primary'>
        <p className='m-4'>{`${country} | ${name}`}</p>
        <p className='m-4'>${ price }</p>
      </div>
      <div></div>
    </div>
  )
}
