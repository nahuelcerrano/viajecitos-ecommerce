import React from 'react'

import { PageHeader } from '../components/HeroBanner/PageHeader'
import { ServicesDiscount } from '../components/ServicesComponent/ServicesDiscount'
import { ServicesBanks } from '../components/ServicesComponent/ServicesBanks'
import { ServicesTours } from '../components/ServicesComponent/ServicesTours'

export const ServicePage = () => {
  return (
    <>
      <PageHeader page='servicios' />

      <main>
        <section className='text-center flex flex-col w-full pb-7 pt-10'>
          <h1 className='text-center text-3xl font-bold py-7 mb-2.5'>Tours Guiados en varios destinos</h1>
        </section>
        <ServicesTours />
        <section className='text-center flex flex-col w-full pb-7 pt-10'>
          <h1 className='text-center text-3xl font-bold py-7 mb-2.5'> Paquetes especiales para nuestros viajeros </h1>
        </section>
        <ServicesDiscount />
        <section className='text-center flex flex-col w-full pb-7 pt-10'>
          <h1 className='text-center text-3xl font-bold py-7 mb-2.5'>Ofrecemos estos beneficios de los siguientes bancos</h1>
        </section>
        <ServicesBanks />
      </main>
    </>
  )
}