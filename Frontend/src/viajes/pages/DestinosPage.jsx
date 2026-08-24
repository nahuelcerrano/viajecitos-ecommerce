import React, { useContext, useEffect } from 'react'

import { FiltersContext } from '../../context/Filters'

import { PageHeader, ViajesSection } from '../components'
import { DestinoFilters } from '../components/FiltersComponents/DestinoFilters'

export const DestinosPage = () => {

  const { setCurrentPage } = useContext(FiltersContext)

  useEffect(() => {
    setCurrentPage('DestinosPage')
  
    return () => {
      setCurrentPage('default')
    }
  }, [])
  

  return (
    <>
      <PageHeader page='viajes' />

      <main>
        
        <section className='text-center flex flex-col w-full pb-7 pt-10'>
          <h2 className='text-center text-3xl font-bold py-7 mb-2.5'>
            Nuestros viajes para usted
          </h2>
          <p className='text-gray-500 w-1/2 mx-auto'>
            Destinos especiales y exoticos, con nuestro catalago de mas de 50 destinos
          </p>
        </section>
        
        <DestinoFilters />
        <ViajesSection numCardsToShow={34}/>
      </main>
    </>
  )
}