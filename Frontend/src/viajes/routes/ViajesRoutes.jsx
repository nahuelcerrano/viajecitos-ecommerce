import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from '../../ui/components/Footer'
import { Navbar } from '../../ui/components/Navbar'
import { AboutPage } from '../pages/AboutPage'
import { HomePage } from '../pages/HomePage'
import { ServicePage } from '../pages/ServicePage'
import { ViajesPage } from '../pages/ViajesPage'
import { DestinosPage } from '../pages/DestinosPage'
import { HotelesPage } from '../pages/HotelesPage'
import { Cart } from '../components/CartComponent/Cart'

export const ViajesRoutes = () => {
  return (
    <>
      <Navbar />

      <div>
        <Routes>
          <Route path='home' element={<HomePage />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='servicios' element={<ServicePage />} />
          <Route path='viajes' element={<ViajesPage />} />
          <Route path='viajes/destinos' element={<DestinosPage />} />
          <Route path='viajes/hoteles' element={<HotelesPage />} />
          <Route path='compras' element={<Cart />}/>

          <Route path='/*' element={<Navigate to='/home' />} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}