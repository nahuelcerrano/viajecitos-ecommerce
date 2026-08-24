import React from 'react'
import { useFilters } from '../../hooks/useFilters'
import { destinos } from '../../../data'
import { ViajesCard } from './ViajesCard'
import viajes from './viajes.module.css'

export const ViajesSection = ({ numCardsToShow }) => {

  const { filterDestination } = useFilters()

  const filteredDestinations = filterDestination(destinos)

  const defaultDisplayedDestinations = filteredDestinations.slice(0, numCardsToShow)

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