import React from 'react'
import { nosotros } from '../../../data'
import { NosotrosCard } from './NosotrosCard'
import nosotrosStyle from './nosotros.module.css'

export const NosotrosSection = () => {
  return (
    <section className={nosotrosStyle.sectionNosotros}>
      <div className={`${nosotrosStyle.container} row flex`}>
        {
          nosotros.map(about => (
            <NosotrosCard
              key={ about.id }
              {...about}
            />
          ))
        }
      </div>
    </section>
  )
}