import React from 'react'
import { SectionImgCard } from './SectionImgCard'
import { icoImg } from '../../data';
import imgSection from './footer.module.css'

export const SectionImg = () => {
  
  const cards = icoImg

  return (
    <section>
      <div className={`${imgSection.container} `}>
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