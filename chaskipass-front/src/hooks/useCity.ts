import { useEffect, useState } from "react";
import { API_BASE_URL } from "../helpers/Constants";
import toast from "react-hot-toast";
import { verifyError } from "../helpers/VerifyErrors";
import { LayoutBusT } from "../types";

export const useCity = () => {
    const [loading, setLoading] = useState(false);
    const [selectCity, setSelectCity] = useState<LayoutBusT[]>([]); // Cambiar a array

    const getCity = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}ubi`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            
            if (!response.ok) {
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

    useEffect(() => {
        getCity().then((data) => {
            setSelectCity(data); // Asigna la lista al estado
        });
    }, []);

    return { loading, selectCity };
};
