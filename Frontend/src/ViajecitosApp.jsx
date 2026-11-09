import React from 'react'
import { AppRouter } from './router/AppRouter'

import { HeroUIProvider } from '@heroui/react'
import { CartProvider } from './context/Cart'
import { FiltersProvider } from './context/Filters'

export const ViajecitosApp = () => {
  return (
    <HeroUIProvider>
      <CartProvider>
        <FiltersProvider>
          <AppRouter />
        </FiltersProvider>
      </CartProvider>
    </HeroUIProvider>
  )
}
