import React from 'react'
import { ImageSlider } from '../AdSection/ImageSlider'
import { ad_viajes } from '../../../data'
import viajes from './viajes.module.css'

export const ViajesAdSection = () => {

  const ads = ad_viajes

  return (
    <section className={viajes.sectionSlide}>
      <div className={viajes.containerSlider}>
        <ImageSlider ads={ ads }/>
      </div>
    </section>
  )
}