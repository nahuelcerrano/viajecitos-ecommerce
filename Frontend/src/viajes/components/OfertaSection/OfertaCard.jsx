import React from 'react'

export const OfertaCard = ({
  id,
  title,
  description,
  off,
}) => {

  const ofertaImgUrl = `/ads/${ id }.jpg`

  return (
    <div className='mx-2.5 my-[15px] h-[400px] w-[250px] flex-[25%] cursor-pointer overflow-hidden rounded-[5px] border-0 bg-white text-white transition-transform duration-500 hover:-translate-y-[15px]'>
      <div
        className='h-1/2 bg-cover bg-center'
        style={{ backgroundImage: `url(${ofertaImgUrl})` }}
      >
        <span className='absolute h-[45px] w-[75px] rounded-tl-[5px] bg-primary text-center font-medium leading-[45px]'>{ off }% OFF</span>
      </div>
      <div className='relative flex w-full flex-col justify-center bg-white px-2 text-center text-muted'>
        <strong className='my-[1em] block text-center font-medium text-black'>{title}</strong>
        <p className='m-4'>{description}</p>
      </div>
    </div>
  )
}
