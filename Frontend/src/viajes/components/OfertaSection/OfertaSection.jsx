import React from 'react'
import { OfertaCard } from './OfertaCard'
import { ad_verano } from '../../../data'
import ofertaStyle from './oferta.module.css'

const sectionContainer = {
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.03)),url(/ads/paquete_especial.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  padding: '30px 0'
}

export const OfertaSection = () => {
    
  return (
    <section style={sectionContainer}>
      <div className={`${ofertaStyle.container} row flex`}>
        <div className={ofertaStyle.title}>
          <h2 className='text-center text-2xl font-bold py-5'>Paquetes Especiales - Temporada Verano</h2>
        </div>
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