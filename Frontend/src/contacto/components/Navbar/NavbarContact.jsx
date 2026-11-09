import React from 'react'
import { Link } from 'react-router-dom'

export const NavbarContact = () => {
  return (
    <header>
      <nav className='max-w-site mx-auto flex justify-between text-black'>
        <Link className='ml-[0.3rem] cursor-pointer font-logo text-logo font-bold' to="/">
          Viajecitos
        </Link>

        <ul className='flex flex-wrap items-center text-base leading-[60px]'>
          <li className='px-2.5'>
            <Link to="/viajes">Viajes</Link>
          </li>

          <li className='px-2.5'>
            <Link to="/about">Nosotros</Link>
          </li>

          <li className='px-2.5'>
            <Link to="/servicios">Servicios</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
