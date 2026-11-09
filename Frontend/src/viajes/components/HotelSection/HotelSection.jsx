import React from 'react'
import { useFilters } from '../../hooks/useFilters'
import { useFetchHoteles } from "../../hooks/useFetchHoteles"
import { hoteles } from '../../../data'
import { ViajesCard } from '../ViajesSection/ViajesCard'

export const HotelSection = ({ numCardstoShow }) => {

  const { filterDestination } = useFilters()
  const { hoteles, isLoading } = useFetchHoteles();

  const filteredDestinations = filterDestination(hoteles)

  const defaultDisplayedDestinations = filteredDestinations.slice(0, numCardstoShow)

  if (isLoading) {
    return <h2 className='text-center py-10'>Cargando hoteles...</h2>
  }

  return (
    <section className='max-w-site mx-auto py-12 font-sans'>      
      <div className='grid grid-cols-4 gap-4'>
        {
          defaultDisplayedDestinations.map(hotel => (
            <ViajesCard
              key = { hotel.id }
              { ... hotel }
            />
          ))
        }
      </div>
    </section>
  )
}
