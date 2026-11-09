import React from 'react'
import { ImageSlider } from '../AdSection/ImageSlider'
import { ad_viajes } from '../../../data'

export const ViajesAdSection = () => {

  const ads = ad_viajes

  return (
    <section className='pb-[60px]'>
      <div className='mx-auto h-[600px] w-[90%]'>
        <ImageSlider ads={ ads }/>
      </div>
    </section>
  )
}
