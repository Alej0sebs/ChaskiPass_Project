import { useState } from "react";
import { TicketClientInformationT } from "../types";
import toast from "react-hot-toast";
import { verifyError } from "../helpers/VerifyErrors";
import { API_BASE_URL } from "../helpers/Constants";

export const useSellTicket = () => {
    const [loading, setLoading] = useState(false);

    const sellTicket = async (purchaseData:TicketClientInformationT) => {
        setLoading(true);
        console.log(purchaseData);
        try{
            const reponse= await fetch(`${API_BASE_URL}tickets/sell`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(purchaseData),
            });
            const data = await reponse.json();
            if(!reponse.ok){
                throw new Error(data.error);
            }

            return 200;

        }catch(error){
            toast.error(verifyError(error));
            return;
        }finally{
            setLoading(false);
        }
    };

    return {
        loading, sellTicket
    };

};