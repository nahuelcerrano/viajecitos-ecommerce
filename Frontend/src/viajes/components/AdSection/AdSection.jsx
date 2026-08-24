import React from 'react'
import { ImageSlider } from './ImageSlider'
import { ads } from '../../../data'
import sliderStyles from './ad.module.css'

export const AdSection = () => {

  return (
    <section className={sliderStyles.sectionSlide}>
      <div className={sliderStyles.containerSlider}>
        <ImageSlider ads={ads}/>
      </div>
    </section>
  )
}