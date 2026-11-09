import React from 'react'
import { Button } from '@heroui/react'
import { Input } from '@heroui/react'

export const Newsletter = () => {
  return (
    <section className='bg-primary p-8'>
      <div className='max-w-site mx-auto flex items-center justify-between'>
          <h2 className='text-white font-bold'>Newsletter Section</h2>
          <div className='flex justify-center'>
            <Input
              color='default'
              radius='none'
              variant='flat'
              type="email"
              label="Email"
              placeholder="Enter your email"
              className='text-inherit'
            />
            <Button radius="none" color='success' className='h-100'>
              Enviar
            </Button>
          </div>
      </div>
    </section>
  )
}
