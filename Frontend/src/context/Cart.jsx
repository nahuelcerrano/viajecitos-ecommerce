import React, { createContext, useEffect, useState } from 'react'
import { destinos } from '../data'

export const CartContext = createContext(null)

const getDefaultCart = () => {
  let cart = {}
  for (let i = 1; i < destinos.length + 1; i++) {
    const countryId = `country${i}`
    cart[countryId] = 0
  }
  return cart
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart())

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        const destino = destinos.find((destino) => destino.id === itemId);
        totalAmount += quantity * destino.price
      }
    }
    return totalAmount
  }

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  const clearCart = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = { cartItems, addToCart, removeFromCart, clearCart, getTotalCartAmount }

  console.log(cartItems)

  return (
    <CartContext.Provider value={contextValue}>
      { children }
    </CartContext.Provider>
  )
}