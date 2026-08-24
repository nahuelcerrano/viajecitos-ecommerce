import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../../context/Cart'
import { PageHeader } from '../HeroBanner/PageHeader';
import { CartItem } from './CartItem';

import { destinos } from '../../../data';


import "./cart.css";
export const Cart = () => {
  
  const { cartItems, clearCart, getTotalCartAmount } = useContext(CartContext)
  const totalAmount = getTotalCartAmount()
  const navigate = useNavigate()

  return (
    <>
      <PageHeader page='cart' />
      <section className='cart py-16'>
        <h1 className='text-2xl font-bold mb-5'>Carrito de Compras</h1>
        <ul className='cart'>
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
            <div className='text-xl mb-5 checkout'>
              <p className='flex justify-center pb-5'>Subtotal: ${totalAmount}</p>
              <button onClick={() => navigate('/viajes/destinos')}>Seguir comprando</button>
              <button onClick={() => clearCart()}>Terminar compra</button>
            </div>
          ) : (
            <h2 className='text-lg font-bold mb-5'>Tu carrito de compras se encuentra vacio</h2>
          )
        }
      </section>
    </>
  )
}