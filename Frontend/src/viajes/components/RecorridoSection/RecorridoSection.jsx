import React from 'react'
import { RecorridoCard } from './RecorridoCard'
import { destinos } from '../../../data'
import sectionStyles from './recorrido.module.css'


export const RecorridoSection = () => {

  const newCountry = destinos.slice(0, 4)

  return (
    <section className={sectionStyles.sectionContainer}>
      <div className={`${sectionStyles.container} row flex`}>
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