import React, { useId } from 'react'

import filterStyles from './filter.module.css'
import { useFilters } from '../../hooks/useFilters'
import { Select, SelectItem } from '@heroui/react'

export const DestinoFilters = () => {

  const { activeFilters, updateFilters } = useFilters()
  const minPriceFilterId = useId()
  const continentFilterId = useId()

  const handleChangeMinPrice = (event) => {
    updateFilters({ minPrice: event.target.value })
  }

  const handleChangeContinent = (event) => {
    updateFilters({ continent: event.target.value })
  }

  return (
    <>
      <section className={filterStyles.filters}>
        <div>
          <label htmlFor={minPriceFilterId}>Precio</label>
          <input
            type="range"
            id={minPriceFilterId}
            min='0'
            max='900'
            step='50'
            onChange={handleChangeMinPrice}
            value={activeFilters.minPrice}
            className={filterStyles.slider}
          />
          <span>${activeFilters.minPrice}</span>
        </div>

        <div>
          <label htmlFor={continentFilterId}>
            <span>Contienente </span>
            <select id={continentFilterId} onChange={handleChangeContinent} value={activeFilters.continent}>
              <option value="all">Todos</option>
              <option value="europa">Europa</option>
              <option value="asia">Asía</option>
              <option value="africa">Africa</option>
              <option value="america del sur">América del Sur</option>
              <option value="america del norte">América del Norte</option>
              <option value="oceanía">Oceanía</option>
            </select>
          </label>
        </div>

      </section>
    </>
  )
}
