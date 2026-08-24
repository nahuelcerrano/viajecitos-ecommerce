import React from 'react'

import { Link } from 'react-router-dom'
import { Button } from '@heroui/react'

import { PageHeader } from '../components/HeroBanner/PageHeader'
import { ViajesSection, HotelSection } from '../components'
import { ViajesAdSection } from '../components/ViajesSection/ViajesAdSection'

export const ViajesPage = () => {
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
        <ViajesSection numCardsToShow={8}/>

        <div className='flex justify-center pt-5 pb-10'>
          <Button
            color="primary"
            variant="shadow"
            radius='medium'
            size='lg'
            className="bg-gradient-to-tr from-[#25aae1] to-[#30dd8a] text-white shadow-lg"
          >
            <Link to='/viajes/destinos'>
              Ver más
            </Link>
          </Button>
        </div>

        <ViajesAdSection />

        <section className='text-center flex flex-col w-full pb-7 pt-10'>
          <h2 className='text-center text-3xl font-bold py-7 mb-2.5'>
            Los mejores hoteles
          </h2>
          <p className='text-gray-500 w-1/2 mx-auto'>
            Los hoteles mas elegidos por nuestros viajeros.
          </p>
        </section>
        <HotelSection numCardstoShow={8}/>

        <div className='flex justify-center pt-5 pb-10'>
          <Button
            color="primary"
            variant="shadow"
            radius='medium'
            size='lg'
            className="bg-gradient-to-tr from-[#25aae1] to-[#30dd8a] text-white shadow-lg"
          >
            <Link to='/viajes/hoteles'>
              Ver más
            </Link>
          </Button>
        </div>
      </main>

    </>
  )
}
