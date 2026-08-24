import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@heroui/react";
import { creditCard, debitCard, banks } from '../../../data'

export const ServicesBanks = () => {
  return (
    <section className='grid grid-cols-3 row pb-10 gap-x-[30px] gap-y-[50px]'>

      <Card
        radius="sm"
        shadow='sm'
        isBlurred
        className='grid row-span-3 bg-transparent'
      >
        <CardHeader className='grid-row-1 flex-col p-5 h-[100px]'>
          <h1 className='text-2xl font-extrabold'>Tarjetas de crédito</h1>
          <h3 className='py-2'>Acreditación instantánea</h3>
        </CardHeader>

        <Divider />

        <CardBody className='grid-row-2 py-5 h-[200px]'>
          <ul className='grid grid-cols-4 items-center h-full'>
            {
              creditCard.map( bank =>(
                <li key={bank.id} className='flex items-center justify-center'>
                  <Image
                    radius='none'
                    className="max-w-[70px]"
                    src={bank.img}
                    alt={bank.name}
                  />
                </li>
              ))
            }
          </ul>
        </CardBody>

        <Divider />

        <CardFooter className='grid-row-3 h-[100px]'>
          <div className='p-4'>
            <p>Hasta 6 cuotas con estas tarjetas</p>
            <p>En productos seleccionados.</p>
          </div>
        </CardFooter>
      </Card>

      <Card
        radius="sm"
        shadow='sm'
        isBlurred
        className='grid row-span-3 bg-transparent'
      >
        <CardHeader className='grid-row-1 flex-col p-5 h-[100px]'>
          <h1 className='text-2xl font-extrabold'>Tarjetas de débito</h1>
          <h3 className='py-2'>Acreditación instantánea</h3>
        </CardHeader>

        <Divider />

        <CardBody className='grid-row-2 py-5 h-[200px]'>
          <ul className='grid grid-cols-2 items-center h-full'>
            {
              debitCard.map( bank =>(
                <li key={bank.id} className='flex items-center justify-center'>
                  <Image
                    radius='none'
                    className="max-w-[70px]"
                    src={bank.img}
                    alt={bank.name}
                  />
                </li>
              ))
            }
          </ul>
        </CardBody>

        <Divider />

        <CardFooter className='grid-row-3 h-[100px]'>
          <div className='p-4'>
            <p>Obtén 10% de descuento en la primera compra</p>
          </div>
        </CardFooter>
      </Card>

      <Card
        radius="sm"
        shadow='sm'
        isBlurred
        className='grid row-span-3 bg-transparent'
      >
        <CardHeader className='grid-row-1 flex-col p-5 h-[100px]'>
          <h1 className='text-2xl font-extrabold'>Bancos socios</h1>
          <h3 className='py-2'>Acreditación instantánea</h3>
        </CardHeader>

        <Divider />

        <CardBody className='grid-row-2 py-5 h-[200px]'>
          <ul className='grid grid-cols-3 items-center h-full'>
            {
              banks.map( bank =>(
                <li key={bank.id} className='flex items-center justify-center'>
                  <Image
                    radius='none'
                    className="max-w-[70px]"
                    src={bank.img}
                    alt={bank.name}
                  />
                </li>
              ))
            }
          </ul>
        </CardBody>

        <Divider />

        <CardFooter className='grid-row-3 h-[100px]'>
          <div className='p-4'>
            <p>25% de descuento en 1 cuota</p>
            <p>En productos seleccionados.</p>
          </div>
        </CardFooter>
      </Card>

    </section>
  )
}
