import { createContext, useState } from "react";

export const FiltersContext = createContext()

const initialFilters = { continent: 'all', minPrice: 0 };

export const FiltersProvider = ({ children }) => {

  const [currentPage, setCurrentPage] = useState('default');

  const [filters, setFilters] = useState({
    DestinosPage: { ...initialFilters },
    HotelesPage: { ...initialFilters }
  });

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilters,
      currentPage,
      setCurrentPage
    }}>
      {children}
    </FiltersContext.Provider>
  )
}
