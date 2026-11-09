import React from 'react'
import { NavbarContact } from '../components/Navbar/NavbarContact'
import { ContactForm } from '../components/ContactForm/ContactForm'
import { FooterContact } from '../components/FooterContact/FooterContact'


export const ContactPage = () => {
  return (
    <>
      <NavbarContact />

      <main>
        <ContactForm />
      </main>

      <FooterContact />
    </>
  )
}