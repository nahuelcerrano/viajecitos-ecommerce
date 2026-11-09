import React from 'react'

export const HeroBanner = ({
  id,
  page,
  title,
  subtitle,
}) => {

  const heroImageUrl = `/backgrounds/${ id }.jpg`
  
  return (
    <div
      className='relative h-[80vh] bg-cover bg-center bg-no-repeat text-shadow-hero'
      style={{ backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, .35) 15%, rgba(0, 0, 0, .35) 25%), url(${heroImageUrl})` }}
    >
        {/* <img src={ heroImageUrl } alt={ page } /> */}
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-[25px] text-center font-sans text-white'>
        <h1 className='m-[35px] rounded-[2.5px] px-2.5 py-0.5 text-hero font-medium'>{ title }</h1>
        <h2 className='text-[1.5rem] font-semibold'>{ subtitle }</h2>
      </div>
    </div>
  )
}
