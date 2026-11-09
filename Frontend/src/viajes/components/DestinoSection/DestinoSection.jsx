import React from 'react'
import { destinos } from '../../../data';
import { DestinoCard } from './DestinoCard';

export const DestinoSection = () => {

  const newCountry = destinos.slice(4, 11)

  return (
    <section>
      <div className='max-w-site mx-auto flex flex-wrap justify-between pb-[10vh]'>
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
