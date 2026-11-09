import React from 'react'
import { OfertaCard } from './OfertaCard'
import { ad_verano } from '../../../data'

export const OfertaSection = () => {
    
  return (
    <section className='bg-oferta-verano bg-cover bg-center bg-no-repeat py-[30px]'>
      <div className='max-w-site mx-auto flex flex-wrap justify-between'>
        <div className='flex-[100%] pb-[70px] text-center text-white text-shadow'>
          <h2 className='mb-2.5 mt-5 text-center text-2xl font-bold py-5'>Paquetes Especiales - Temporada Verano</h2>
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
