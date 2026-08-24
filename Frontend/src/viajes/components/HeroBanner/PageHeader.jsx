import React from 'react'
import { getPageByName } from '../../helpers/getPageByName'
import { HeroBanner } from './HeroBanner'

export const PageHeader = ({ page }) => {
  
  const viajes = getPageByName( page )

  return (
    <>
      {
        viajes.map( viaje => (
          <HeroBanner
            key={ viaje.id }
            { ...viaje }
          />
        ))
      }
    </>
  )
}