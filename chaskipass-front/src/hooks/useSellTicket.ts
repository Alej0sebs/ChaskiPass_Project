import { useState } from "react";
import { TicketClientInformationT } from "../types";
import toast from "react-hot-toast";
import { verifyError } from "../helpers/VerifyErrors";

export const useSellTicket = () => {
    const [loading, setLoading] = useState(false);

    const sellTicket = async (purchaseData:TicketClientInformationT) => {
        setLoading(true);
        try{
            
        }catch(error){
            toast.error(verifyError(error));
            return;
        }finally{
            setLoading(false);
        }
    };

};