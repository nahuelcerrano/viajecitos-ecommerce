import React from 'react'
import { IconContext } from 'react-icons';
import { FaLinkedin, FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const listStyles = 'flex justify-between text-sm font-normal leading-[60px]'
const itemStyles = 'px-2.5 cursor-pointer'

export const FooterContact = () => {
  return (
    <footer className="bg-ink py-8 text-white">
      <div className="bg-black/[0.27]">
        <div className="max-w-site mx-auto flex flex-wrap items-center justify-between leading-5">
          <ul className={listStyles}>
            <li className={itemStyles}>
              <Link to="/viajes">Viajes</Link>
            </li>

            <li className={itemStyles}>
              <Link to="/about">Nosotros</Link>
            </li>

            <li className={itemStyles}>
              <Link to="/servicios">Servicios</Link>
            </li>
            <li className={itemStyles}>
              <Link to="/contact">Contacto</Link>
            </li>
          </ul>
          <ul className={listStyles}>
            <li className={itemStyles}>
              <IconContext.Provider value={{ size: '23px', style: { verticalAlign: 'middle'} }}>
                <FaLinkedin />
              </IconContext.Provider>
            </li>
            <li className={itemStyles}>
              <IconContext.Provider value={{ size: '23px', style: { verticalAlign: 'middle'} }}>
                <FaGithub />
              </IconContext.Provider>
            </li>
            <li className={itemStyles}>
              <IconContext.Provider value={{ size: '23px', style: { verticalAlign: 'middle'} }}>
                <FaTwitter />
              </IconContext.Provider>
            </li>
            <li className={itemStyles}>
              <IconContext.Provider value={{ size: '23px', style: { verticalAlign: 'middle'} }}>
                <FaYoutube />
              </IconContext.Provider>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
