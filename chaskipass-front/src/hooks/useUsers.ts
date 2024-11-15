import { useEffect, useState } from "react";
import { API_BASE_URL } from "../helpers/Constants";
import toast from "react-hot-toast";
import { verifyError } from "../helpers/VerifyErrors";
import { UserT } from "../types";

export default function useUsers() {
    const [loading, setLoading] = useState(false);
    const [dataListUsers, setdataListUsers] = useState<UserT[]>([]);



    const getDrivers = async () => {
        setLoading(true);
        try {
            const res: Response = await fetch(`${API_BASE_URL}users/drivers`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            return data.json;
        } catch (error) {
            console.error(error);
            toast.error(verifyError(error));
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getDrivers
            ().then((data) => {
                setdataListUsers(data); // Asigna la lista al estado selectSeller

            });
    }, []);

    return {
        loading,
        dataListUsers, getDrivers
    };
}