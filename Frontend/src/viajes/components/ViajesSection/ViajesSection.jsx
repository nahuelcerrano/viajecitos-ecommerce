import React from 'react'
import { useFilters } from '../../hooks/useFilters'
import { useFetchDestinos } from '../../hooks/useFetchDestinos'
import { destinos } from '../../../data'
import { ViajesCard } from './ViajesCard'
import viajes from './viajes.module.css'

export const ViajesSection = ({ numCardsToShow }) => {

  const { filterDestination } = useFilters()
  const { destinos, isLoading  } = useFetchDestinos();

  const filteredDestinations = filterDestination(destinos)
  const defaultDisplayedDestinations = filteredDestinations.slice(0, numCardsToShow)

  if (isLoading) {
    return <h2 className='text-center py-10'>Cargando destinos...</h2>;
  }

  return (
    <section className={viajes.sectionViajes}>
      <div className={viajes.cardsContainer}>
        {
          defaultDisplayedDestinations.map(destino => (
            <ViajesCard 
              key = { destino.id }
              { ... destino }
            />
          ))
        }
      </div>
    </section>
  )
}