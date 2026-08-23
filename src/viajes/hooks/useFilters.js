import { useContext } from "react"
import { FiltersContext } from "../../context/Filters"

export const useFilters = () => {
  const { filters, setFilters, currentPage } = useContext(FiltersContext)


  const activeFilters = filters[currentPage] || { continent: 'all', minPrice: 0 };

  const filterDestination = (items) => {
    if (currentPage === 'DestinosPage' || currentPage === 'HotelesPage') {
      return items.filter(item => {
        return (
          item.price >= activeFilters.minPrice &&
          (
            activeFilters.continent === 'all' ||
            item.continent === activeFilters.continent
          )
        )
      })
    } else {
      return items
    }
  }

  const updateFilters = (newValues) => {
    setFilters(prevState => ({
      ...prevState,
      [currentPage]: {
        ...prevState[currentPage],
        ...newValues
      }
    }))
  }

  return { activeFilters, filterDestination, updateFilters }
}
