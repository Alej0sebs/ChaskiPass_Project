import { useState } from "react";

import {  TypeBusT} from "../types";
import { API_BASE_URL } from "../helpers/Constants";
import toast from "react-hot-toast";
import { verifyError } from "../helpers/VerifyErrors";

export default function createBus(){
    const [loading, setLoading] = useState(false);
  

    const bus = async(userData:TypeBusT)=>{
        setLoading(true);
        console.log(userData);
        try {
            const response:Response = await fetch(`${API_BASE_URL}/newBus`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                credentials:'include',
                body:JSON.stringify(userData),
            });
            const data = await response.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem('chaski-log', JSON.stringify(data));
           
        } catch (error) {
            toast.error(verifyError(error));
        }finally{
            setLoading(false);
        }
    }
    return {loading, bus};
}
