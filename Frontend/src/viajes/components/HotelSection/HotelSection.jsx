import React from 'react'
import { useFilters } from '../../hooks/useFilters'
import { useFetchHoteles } from "../../hooks/useFetchHoteles"
import { hoteles } from '../../../data'
import { ViajesCard } from '../ViajesSection/ViajesCard'
import hotel from './hotel.module.css'

export const HotelSection = ({ numCardstoShow }) => {

  const { filterDestination } = useFilters()
  const { hoteles, isLoading } = useFetchHoteles();

  const filteredDestinations = filterDestination(hoteles)

  const defaultDisplayedDestinations = filteredDestinations.slice(0, numCardstoShow)

  if (isLoading) {
    return <h2 className='text-center py-10'>Cargando hoteles...</h2>
  }

  return (
    <section className={hotel.sectionHotel}>      
      <div className={hotel.cardsContainer}>
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