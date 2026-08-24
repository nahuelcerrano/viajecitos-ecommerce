import React from 'react'
import { Link } from 'react-router-dom'
import navbarStyles from './navbar.module.css'

export const NavbarContact = () => {
  return (
    <header>
      <nav className={ navbarStyles.navbar }>
        <Link className={navbarStyles.logo} to="/">
          Viajecitos
        </Link>

        <ul className={navbarStyles.menu}>
          <li className={navbarStyles.list}>
            <Link to="/viajes">Viajes</Link>
          </li>

          <li className={navbarStyles.list}>
            <Link to="/about">Nosotros</Link>
          </li>

          <li className={navbarStyles.list}>
            <Link to="/servicios">Servicios</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}