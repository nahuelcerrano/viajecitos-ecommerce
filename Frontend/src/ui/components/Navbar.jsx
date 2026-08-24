import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { BsFillCartFill } from "react-icons/bs";

import navStyles from "./navbar.module.css";


export const Navbar = () => {

  const [fixed, setFixed] = useState(false)

  const navbar = useRef()
  const navbarOffset = useRef()

  useEffect(() => {

    const handleScroll = () => {
      const value = navbarOffset.current.clientHeight

      setFixed(window.pageYOffset >= value)
    }

    window.addEventListener('scroll', handleScroll)

    return () =>
      window.removeEventListener('scroll', handleScroll)
  },[])

  return (
    <div
      className={`${navStyles.header}  ${fixed && navStyles.fixed} ${fixed && 'animate__animated animate__slideInDown'} ${!fixed && 'animate__animated animate__fadeIn animate__faster'}`}
      ref={navbarOffset}>
      <nav
      // ${fixed && navStyles.fixed} ${fixed && 'animate__animated animate__slideOutUp'}
      className={`${navStyles.navbar} row`}
      ref={navbar}>
        <Link className={`${navStyles.logo}`} to="/">
          Viajecitos
        </Link>

        <ul className={navStyles.menu}>
          <li className={navStyles.list}>
            <Link to="/viajes">Viajes</Link>
          </li>

          <li className={navStyles.list}>
            <Link to="/about">Nosotros</Link>
          </li>

          <li className={navStyles.list}>
            <Link to="/servicios">Servicios</Link>
          </li>
        </ul>
        <div className={ navStyles.buttons }>
          <Button radius="lg" className={ fixed ? 'bg-white text-black' : 'bg-rose-700 text-white' }>
            <Link to="/contacto">
              Contacto
            </Link>
          </Button>
          <Link to='/compras'>
            <BsFillCartFill className='ml-4' size={28}/>
          </Link>
        </div>
      </nav>
    </div>
  );
};
