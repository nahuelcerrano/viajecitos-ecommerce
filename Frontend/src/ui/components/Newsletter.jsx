import React from 'react'
import newsletter from './footer.module.css'
import { Button } from '@heroui/react'
import { Input } from '@heroui/react'

export const Newsletter = () => {
  return (
    <section className={newsletter.newsletter}>
      <div className={`${newsletter.newsflex} row items-center`}>
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
