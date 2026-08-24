import React from 'react'
import { ToursCards } from './ToursCards'
import { destinos } from '../../../data'

export const ServicesTours = () => {

  const newDestinos = destinos.slice(13, 19)

  return (
    <section className='grid grid-cols-3 grid-rows-0 gap-12 pb-10 row'>
      {
        newDestinos.map( tour => (
          <ToursCards 
            key={ tour.id }
            { ...tour }
          />
        ))
      }
    </section>
  )
}