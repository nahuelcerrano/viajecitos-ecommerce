import { useState, useEffect } from 'react';

export const useFetchHoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getHoteles = async () => {
      try {
        const response = await fetch('/api/hotel');
        const data = await response.json();
        
        setHoteles(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener los hoteles:", error);
        setIsLoading(false);
      }
    };

    getHoteles();
  }, []);

  return { hoteles, isLoading };
}