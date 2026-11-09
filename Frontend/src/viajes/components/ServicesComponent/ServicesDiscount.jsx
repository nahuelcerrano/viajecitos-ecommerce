import React from 'react'

import { OfertaCard } from '../OfertaSection/OfertaCard'
import { ad_verano } from '../../../data'

export const ServicesDiscount = () => {
  return (
    <section className='max-w-site mx-auto'>
      <div className='flex flex-wrap justify-between'>
        {
          ad_verano.map( card => (
            <OfertaCard
              key={ card.id }
              {...card}
            />
          ))
        }
      </div>
    </section>
  )
}
