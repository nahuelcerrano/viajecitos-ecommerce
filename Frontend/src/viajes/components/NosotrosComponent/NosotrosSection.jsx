import React from 'react'
import { nosotros } from '../../../data'
import { NosotrosCard } from './NosotrosCard'

export const NosotrosSection = () => {
  return (
    <section className='py-[30px]'>
      <div className='max-w-site mx-auto flex flex-wrap justify-between pb-[20vh] pt-[5vh]'>
        {
          nosotros.map(about => (
            <NosotrosCard
              key={ about.id }
              {...about}
            />
          ))
        }
      </div>
    </section>
  )
}
