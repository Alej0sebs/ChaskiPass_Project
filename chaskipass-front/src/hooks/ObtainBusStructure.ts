import { useState } from "react";
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
        if (data.error) {
          throw new Error(data.error);
        }
        return data;  
      } catch (error) {
        toast.error(verifyError(error));
        return [];
      } finally {
        setLoading(false);
      }
    };
  
    return { loading, fetchBusStructures };
  };