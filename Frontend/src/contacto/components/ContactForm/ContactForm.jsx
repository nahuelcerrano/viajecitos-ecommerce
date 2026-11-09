import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { Input, Textarea, Card, CardHeader, CardBody, CardFooter, Divider, Button } from '@heroui/react';

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm()

  const navigate = useNavigate()
  const onSubmit = () => {
    navigate('/reedirecion')
  }

  return (
      <section className='flex place-content-center justify-center py-16 bg-form'>
        <Card
          isBlurred
          className='bg-background/60 w-full max-w-3xl'
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="flex gap-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500">
              <div className="flex flex-col px-4 py-10">
                <p className="text-3xl text-white font-medium py-5">Contáctanos</p>
                <p className="text-small text-white italic">Envíanos tus consultas o feedback y te responderemos a la brevedad.</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="w-full flex flex-col py-10 px-8 md:px-16 gap-6">

                {/* Fila 1: Nombre y Apellido */}
                <div className="flex w-full flex-col md:flex-row gap-5">
                  <Input
                    {...register('name', {
                      required: 'El nombre es requerido',
                      pattern: {
                        value: /^[a-zA-Z \s]{3,40}$/,
                        message: 'Ingrese un nombre válido'
                      }
                    })}
                    classNames={{ inputWrapper: ['border-stone-500', 'dark:hover:bg-default/70'] }}
                    type='text' variant='bordered' radius='sm' label='Nombre'
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                  <Input
                    {...register('lastname', {
                      required: 'El apellido es requerido',
                      pattern: {
                        value: /^[a-zA-Z \s]{3,40}$/,
                        message: 'Ingrese un apellido válido'
                      }
                    })}
                    classNames={{ inputWrapper: ['border-stone-500', 'dark:hover:bg-default/70'] }}
                    type='text' variant='bordered' radius='sm' label='Apellido'
                    isInvalid={!!errors.lastname}
                    errorMessage={errors.lastname?.message}
                  />
                </div>

                {/* Fila 2: Email y Teléfono */}
                <div className="flex w-full flex-col md:flex-row gap-5">
                  <Input
                    {...register('email', {
                      required: 'El email es requerido',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Ingrese un email válido'
                      }
                    })}
                    classNames={{ inputWrapper: ['border-stone-500', 'dark:hover:bg-default/70'] }}
                    type='email' variant='bordered' radius='sm' label='Email'
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                  <Input
                    {...register('number', {
                      required: 'El número es requerido',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Ingrese solo números'
                      },
                      minLength: {
                        value: 8,
                        message: 'El número debe tener al menos 8 caracteres'
                      }
                    })}
                    classNames={{ inputWrapper: ['border-stone-500', 'dark:hover:bg-default/70'] }}
                    type='text' variant='bordered' radius='sm' label='Teléfono'
                    isInvalid={!!errors.number}
                    errorMessage={errors.number?.message}
                  />
                </div>

                {/* Fila 3: Mensaje */}
                <div className="flex w-full">
                  <Textarea
                    {...register('message', {
                      required: 'Por favor, ingrese su mensaje',
                      minLength: {
                        value: 10,
                        message: 'El mensaje es muy corto'
                      }
                    })}
                    classNames={{ inputWrapper: ['border-stone-500', 'dark:hover:bg-default/70'] }}
                    variant="bordered"
                    radius='sm'
                    label="Mensaje"
                    placeholder="¿En qué te podemos ayudar?"
                    minRows={4}
                    isInvalid={!!errors.message}
                    errorMessage={errors.message?.message}
                  />
                </div>

              </div>
            </CardBody>
            <Divider />
            <CardFooter className='flex justify-center py-5'>
              <Button
                color="success"
                variant="shadow"
                radius='md'
                className='bg-gradient-to-tr from-green-400 to-green-600 text-white shadow-lg px-16 font-medium text-lg'
                isDisabled={!isDirty}
                type='submit'
              >
                Enviar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </section>
    )
}
