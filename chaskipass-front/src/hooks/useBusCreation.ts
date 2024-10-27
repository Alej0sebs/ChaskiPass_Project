import { useState } from "react";

import { TypeBusT } from "../types";
import { API_BASE_URL } from "../helpers/Constants";
import toast from "react-hot-toast";
import { verifyError } from "../helpers/VerifyErrors";

export default function useBusCreation() {
    const [loading, setLoading] = useState(false);


    const bus = async (creBus: TypeBusT) => {
        setLoading(true);
        console.log(creBus);
        try {
            const response: Response = await fetch(`${API_BASE_URL}buses/newBus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(creBus),
            });
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            toast.success(data.msg);
        } catch (error) {
            toast.error(verifyError(error));
        } finally {
            setLoading(false);
        }
    }
    return { loading, bus };
}
