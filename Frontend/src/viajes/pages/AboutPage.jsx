import React from 'react'

import { PageHeader } from '../components/HeroBanner/PageHeader'
import { AboutSection } from '../components/AboutSection/AboutSection'

export const AboutPage = () => {
  return (
    <>
      <PageHeader page='about' />

      <main>
        <AboutSection />
      </main>
    </>
  )
}