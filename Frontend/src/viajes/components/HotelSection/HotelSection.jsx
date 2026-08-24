import React from 'react'
import { useFilters } from '../../hooks/useFilters'
import { hoteles } from '../../../data'
import { ViajesCard } from '../ViajesSection/ViajesCard'
import hotel from './hotel.module.css'

export const HotelSection = ({ numCardstoShow }) => {

  const { filterDestination } = useFilters()

  const filteredDestinations = filterDestination(hoteles)

  const defaultDisplayedDestinations = filteredDestinations.slice(0, numCardstoShow)

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