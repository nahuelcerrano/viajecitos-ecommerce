import React from 'react'
import { destinos } from '../../../data';
import destinoStyles from './destino.module.css'
import { DestinoCard } from './DestinoCard';

export const DestinoSection = () => {

  const newCountry = destinos.slice(4, 11)

  return (
    <section className={destinoStyles.section}>
      <div className={` ${destinoStyles.container} flex row`}>
        {
          newCountry.map(countries => (
            <DestinoCard
              key={ countries.id }
              {...countries}
            />
          ))
        }
      </div>
    </section>
  )
}