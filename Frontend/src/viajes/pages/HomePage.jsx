import React from 'react'

import { 
  AdSection, 
  DestinoSection, 
  PageHeader, 
  RecorridoSection, 
  OfertaSection, 
  NosotrosSection 
} from '../components'

export const HomePage = () => {
  return (
    <>
      <PageHeader page='home' />
      
      <main>
        <section className='text-center flex flex-col w-full pb-7 pt-10'>
            <h2 className='text-center text-3xl font-bold py-7 mb-2.5'>Recorridos Únicos</h2>
            <p className='text-gray-500 w-1/2 mx-auto'>
              Destinos especiales y exoticos, con nuestro catalago de mas de 50 destinos, 
              ofrecemos desde los lugares mas elegidos 
              hasta los lugares que solo los mas aventureros se animan a ir, ¿Cuál elegirás?
            </p>
        </section>
        
        <RecorridoSection />
        
        <AdSection />
        
        <section className='text-center flex flex-col w-full pb-7 pt-10'>
          <h2 className='text-center text-3xl font-bold py-7 mb-2.5'>Elegí tu destino</h2>
          <p className='text-gray-500 w-1/2 mx-auto'>
            Los 6 destinos mas populares que eligen nuestro viajeros
          </p>
        </section>
        <DestinoSection />
        
        <OfertaSection />
        
        <section className='text-center flex flex-col w-full pb-7 pt-10'>
          <h2 className='text-center text-3xl font-bold py-7 mb-2.5'>Viaja con Nosotros</h2>
          <p className='text-gray-500 w-1/2 mx-auto'>
            Con más de 20 años de experiencia en viajes, podrá confiarnos en nosotros su seguridad 
            en los mas de 50 destinos únicos que ofrecemos con tours personalizados y guias capacitados.
          </p>
        </section>
        <NosotrosSection />
      </main>


    </>
  )
}