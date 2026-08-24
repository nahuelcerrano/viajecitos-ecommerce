import React from 'react'

import { OfertaCard } from '../OfertaSection/OfertaCard'
import { ad_verano } from '../../../data'
import servicesDiscount from './services.module.css'

export const ServicesDiscount = () => {
  return (
    <section className='row'>
      <div className={ servicesDiscount.container }>
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
