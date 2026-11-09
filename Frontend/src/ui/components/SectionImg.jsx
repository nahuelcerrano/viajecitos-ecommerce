import React from 'react'
import { SectionImgCard } from './SectionImgCard'
import { icoImg } from '../../data';

export const SectionImg = () => {
  
  const cards = icoImg

  return (
    <section>
      <div className='flex flex-wrap items-center justify-between leading-5'>
        {
          cards.map( card => (
            <SectionImgCard 
              key={ card.id }
              {...card}
            />
          ))
        }
      </div>
    </section>
  )
}
