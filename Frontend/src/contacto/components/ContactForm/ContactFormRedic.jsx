import { Card, CardBody } from '@heroui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ContactFormRedic = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 3500)

    return () => {
      clearTimeout(timer)
    }
  }, [navigate])


  return (
    <section className='bg-form h-screen'>
      <div className='absolute left-1/3 top-1/3 text-5xl font-bold'>
          <h1 className='mb-6'>Gracias por responder</h1>
          <h2>Volviendo al inicio</h2>
      </div>
    </section>
  )
}
