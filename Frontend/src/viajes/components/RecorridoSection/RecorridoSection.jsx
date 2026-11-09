import React from 'react'
import { RecorridoCard } from './RecorridoCard'
import { destinos } from '../../../data'


export const RecorridoSection = () => {

  const newCountry = destinos.slice(0, 4)

  return (
    <section className='pt-[30px]'>
      <div className='max-w-site mx-auto flex flex-wrap justify-between pb-[10vh] pt-[5vh]'>
        {
        newCountry.map(countries => (
          <RecorridoCard 
            key={ countries.id }
            {...countries}
          />
        ))
      }
      </div>
    </section>
  )
}
