import { viajes } from '../../data/';

export const getPageByName = ( page ) => {

  const validTrip = ['home', 'viajes', 'servicios', 'about', 'cart' ]

  if ( !validTrip.includes(page) ) {
    throw new Error(`${ page } is not a valid page!`)
  }

  return viajes.filter( viaje => viaje.page === page )
}