import React from 'react'
import { Card, CardBody, Image } from '@heroui/react'

export const ToursCards = ({
  id,
  name,
  alt,
  price,
  discount,
  bank,
  rating,
  guide = 0.0,
}) => {

  const tourUrl = `/countries/${ id }.jpg`

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 m-0"
      shadow="sm"
      radius='sm'
    >
      <CardBody className='p-0'>
        <div className="grid grid-row-3 gap-5 items-center">
            <Image
              alt={ alt }
              className="row-span-1 w-full object-cover relative"
              shadow="md"
              radius='none'
              src={ tourUrl }
            />
          <div className="row-span-1 pb-5 px-4">
            <p className='text-small'>{ guide }</p>

            <p className="text-lg font-extrabold mt-3">Tour de { name } - Tour Privado</p>

            <div className='mt-3'>
              <span className='mr-5 bg-[#30a071] p-1.5 border-2 border-solid border-black rounded-lg font-bold'>{ rating }</span>
              <span className='text-lg'>★ ★ ★ ★ ★</span>
            </div>

            <p className="text-lg mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          <div className='row-span-1 pb-3 pl-4'>
            <p className='font-medium'>Desde <span className='text-lg'>${ price }</span> ~ { discount }% OFF con { bank } </p>
          </div>

        </div>
      </CardBody>
    </Card>
  )
}
