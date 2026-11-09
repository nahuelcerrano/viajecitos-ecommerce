import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../../context/Cart'
import { PageHeader } from '../HeroBanner/PageHeader';
import { CartItem } from './CartItem';

import { destinos } from '../../../data';

const checkoutButton = 'm-2.5 h-20 w-[150px] cursor-pointer rounded-lg border-none bg-[#131313] text-white'

export const Cart = () => {
  
  const { cartItems, clearCart, getTotalCartAmount } = useContext(CartContext)
  const totalAmount = getTotalCartAmount()
  const navigate = useNavigate()

  return (
    <>
      <PageHeader page='cart' />
      <section className='flex flex-col items-center justify-center py-16'>
        <h1 className='text-2xl font-medium mb-5'>Carrito de Compras</h1>
        <ul className='flex flex-col items-center justify-center text-[14px] font-normal leading-[60px]'>
          {
            destinos.map(destino => {
              if (cartItems[destino.id] !== 0) {
                return (
                  <CartItem
                    key={destino.id}
                    {...destino}
                  />
                );
              }
            })
          }
        </ul>
        
        {
          totalAmount > 0 ? (
            <div className='text-xl mb-5'>
              <p className='flex justify-center pb-5'>Subtotal: ${totalAmount}</p>
              <button className={checkoutButton} onClick={() => navigate('/viajes/destinos')}>Seguir comprando</button>
              <button className={checkoutButton} onClick={() => clearCart()}>Terminar compra</button>
            </div>
          ) : (
            <h2 className='text-lg font-medium mb-5'>Tu carrito de compras se encuentra vacio</h2>
          )
        }
      </section>
    </>
  )
}
