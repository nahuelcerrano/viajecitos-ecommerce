import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { BsFillCartFill } from "react-icons/bs";


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
      className={`fixed top-0 z-20 w-full ${fixed ? 'bg-nav-gradient transition-all duration-500 animate-slide-in-down' : 'animate-fade-in'}`}
      ref={navbarOffset}>
      <nav
      className="max-w-site mx-auto flex justify-between py-5 leading-[60px] text-white transition-all duration-200"
      ref={navbar}>
        <Link className="ml-[0.3rem] cursor-pointer font-logo text-logo font-bold text-shadow" to="/">
          Viajecitos
        </Link>

        <ul className="m-0 flex flex-wrap text-base leading-[60px]">
          <li className="px-2.5 text-shadow">
            <Link to="/viajes">Viajes</Link>
          </li>

          <li className="px-2.5 text-shadow">
            <Link to="/about">Nosotros</Link>
          </li>

          <li className="px-2.5 text-shadow">
            <Link to="/servicios">Servicios</Link>
          </li>
        </ul>
        <div className="flex items-center justify-center">
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
