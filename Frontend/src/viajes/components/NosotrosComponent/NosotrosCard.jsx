import React from 'react'

export const NosotrosCard = ({
  id,
  title,
  description,
}) => {
  
  const nosotrosImgUrl = `/backgrounds/${ id }.jpg`

  return (
    <div className='relative mb-5 h-[350px] w-[250px] overflow-hidden rounded-[5px] border-[0.5px] border-surface-alt bg-white text-muted'>
      <div
        className='h-1/2 bg-cover bg-center transition-all duration-300 ease-out hover:-rotate-[1.5deg] hover:scale-110 hover:opacity-90'
        style={{ backgroundImage: `url(${nosotrosImgUrl})` }}
      ></div>
      <div className='relative flex w-full flex-col justify-center bg-white px-2 text-center text-muted'>
        <strong className='my-[1em] block text-center font-medium text-black'>{title}</strong>
        <p>{description}</p>
      </div>
    </div>
  )
}
