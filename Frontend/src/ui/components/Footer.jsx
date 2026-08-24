import React from 'react'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons';
import { FaLinkedin, FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa';
import footerStyles from './footer.module.css'
import { Newsletter } from './Newsletter';
import { SectionImg } from './SectionImg';

export const Footer = () => {
  return (
    <>
      <Newsletter />
      <SectionImg />
      <footer className={footerStyles.footer}>
        <div className={footerStyles.nav}>
          <div className={`${footerStyles.container} row`}>
            <ul style={footerStyles.ul}>
              <li className={footerStyles.li}>
                <Link to="/viajes">Viajes</Link>
              </li>

              <li className={footerStyles.li}>
                <Link to="/about">Nosotros</Link>
              </li>

              <li className={footerStyles.li}>
                <Link to="/servicios">Servicios</Link>
              </li>
              <li className={footerStyles.li}>
                <Link to="/contact">Contacto</Link>
              </li>
            </ul>
            <ul>
              <li>
                <IconContext.Provider value={{ size: '23px', style: { verticalAlign: 'middle'} }}>
                  <FaLinkedin />
                </IconContext.Provider>
              </li>
              <li>
                <IconContext.Provider value={{ size: '23px', style: { verticalAlign: 'middle'} }}>
                  <FaGithub />
                </IconContext.Provider>
              </li>
              <li>
                <IconContext.Provider value={{ size: '23px', style: { verticalAlign: 'middle'} }}>
                  <FaTwitter />
                </IconContext.Provider>
              </li>
              <li>
                <IconContext.Provider value={{ size: '23px', style: { verticalAlign: 'middle'} }}>
                  <FaYoutube />
                </IconContext.Provider>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}