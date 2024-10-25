import { useState} from "react";
import { API_BASE_URL } from "../helpers/Constants";
import toast from "react-hot-toast";
import { verifyError } from "../helpers/VerifyErrors";

export const ObtainBusStructure = () => {
    const [loading, setLoading] = useState(false);

    const fetchBusStructures = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}busStructure`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Error al obtener las estructuras de buses');
        }

        return Array.isArray(data) ? data : [];  // Verifica que `data` sea un array
      } catch (error) {
        toast.error(verifyError(error));
        return [];  // Retorna un array vacío en caso de error
      } finally {
        setLoading(false);
      }
    };

    return { loading, fetchBusStructures };
};
