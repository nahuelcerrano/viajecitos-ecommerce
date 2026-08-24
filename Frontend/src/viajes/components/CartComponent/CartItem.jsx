import React, { useContext } from 'react'
import { CartContext } from '../../../context/Cart'
import { Button, Card, CardBody, Image } from '@heroui/react'

export const CartItem = ({
  id,
  url,
  alt,
  name,
  country,
  description,
  price,
}) => {

  const destinoImageUrl = `/${ url }/${ id }.jpg`

  const { cartItems, addToCart, removeFromCart } = useContext(CartContext)

  return (
    <li className='row'>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 mb-10"
        shadow="sm"
        radius='sm'
      >
        <CardBody>
          <div className="grid grid-cols-2 grid-rows-1 gap-0 items-center justify-center">
            <div className="relative row-span-2 pr-5">
              <Image
                alt={ alt }
                className="object-cover"
                shadow="md"
                src={ destinoImageUrl }
                width="360px"
                height='240px'
              />
            </div>

            <div className="col-span-1">
              <p className="text-lg font-extrabold">Destino: { country } | { name }</p>
              <p>{ description }</p>
              <p className='text-lg'>Precio: <b>${ price }</b> </p>
            </div>

            <div className='col-span-1'>
              <Button
                size='sm'
                color='success'
                radius='sm'
                className='text-lg font-medium'
                onClick={() => removeFromCart(id)}
              >
                -
              </Button>
              <span className='mx-4 text-lg font-medium'>{ cartItems[id] }</span>
              <Button
                size='sm'
                color='success'
                radius='sm'
                className='text-lg font-medium'
                onClick={() => addToCart(id)}
              >
                +
              </Button>
            </div>

          </div>
        </CardBody>
      </Card>
    </li>
  )
}
