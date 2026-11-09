import React from 'react'
import { useFilters } from '../../hooks/useFilters'
import { useFetchDestinos } from '../../hooks/useFetchDestinos'
import { destinos } from '../../../data'
import { ViajesCard } from './ViajesCard'

export const ViajesSection = ({ numCardsToShow }) => {

  const { filterDestination } = useFilters()
  const { destinos, isLoading  } = useFetchDestinos();

  const filteredDestinations = filterDestination(destinos)
  const defaultDisplayedDestinations = filteredDestinations.slice(0, numCardsToShow)

  if (isLoading) {
    return <h2 className='text-center py-10'>Cargando destinos...</h2>;
  }

  return (
    <section className='max-w-site mx-auto py-12 font-sans'>
      <div className='grid grid-cols-4 gap-4'>
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
