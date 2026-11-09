import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ContactPage } from '../contacto/pages/ContactPage'
import { ViajesRoutes } from '../viajes/routes/ViajesRoutes'
import { ContactFormRedic } from '../contacto/components/ContactForm/ContactFormRedic'

export const AppRouter = () => {

  return (
    <>
      <Routes>
        
        <Route path='/contacto' element={<ContactPage />} />
        <Route path='/reedirecion' element={<ContactFormRedic />} />

        <Route path='/*' element={<ViajesRoutes />}> 
        
        </Route>
      
      </Routes>
    </>
  )
}