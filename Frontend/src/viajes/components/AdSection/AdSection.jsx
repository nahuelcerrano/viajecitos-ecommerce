import React from 'react'
import { ImageSlider } from './ImageSlider'
import { ads } from '../../../data'

export const AdSection = () => {

  return (
    <section className='pb-[60px]'>
      <div className='mx-auto h-[600px] w-[90%]'>
        <ImageSlider ads={ads}/>
      </div>
    </section>
  )
}
