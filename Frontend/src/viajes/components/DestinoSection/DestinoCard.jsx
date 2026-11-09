import React from 'react'

export const DestinoCard = ({
  id,
  country,
  city,
  price,
}) => {

  const destinoImageUrl = `/countries/${ id }.jpg`


  return (
    <div className='relative mb-5 h-[250px] w-[130px] cursor-pointer overflow-visible rounded-[5px] border-none bg-transparent text-white'>
      <div
        className='h-1/2 rounded-full bg-cover bg-center transition-shadow duration-1000'
        style={{ backgroundImage: `url(${destinoImageUrl})` }}
      ></div>
      <div className='grid grid-cols-1 grid-rows-2 gap-y-[5px] text-black'>
        <strong className='my-[1em] block text-center font-bold'>{ country }</strong>
        <p className='text-center text-muted'>{ city }</p>
      </div>
    </div>
  )
}
