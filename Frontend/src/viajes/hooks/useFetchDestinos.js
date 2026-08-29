import { useState, useEffect, use } from "react";

export const useFetchDestinos = () => {
    const [destinos, setDestinos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const getDestinos = async () => {
        try {
            const response = await fetch('/api/destino');
            const data = await response.json();

            setDestinos(data);
            setIsLoading(false);
        }catch (error) {
            console.error("Error al obtener los destinos: ", error);
            setIsLoading(false);
        }
      };
    
      getDestinos();
    }, []);
    
    return { destinos, isLoading };
}