import { useState } from "react";
import { API_BASE_URL } from "../helpers/Constants";
import toast from "react-hot-toast";
import { verifyError } from "../helpers/VerifyErrors";

interface RouteI{
    departure_station_id: number;
    arrival_station_id: number;
    stopOverList:number[];
}

export default function useRoutes() {
    const [loading, setLoading] = useState(false);

    const createRoute= async(routeData: RouteI)=>{  
        setLoading(true);
        try {
            const response:Response = await fetch(`${API_BASE_URL}frequency/route`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                credentials:'include',
                body:JSON.stringify(routeData),
            });
            const data = await response.json();
            if(data.json.error || response.status !== 201){
                throw new Error(data.json.error);
            }
            toast.success(data.json.msg);
        } catch (error) {
            toast.error(verifyError(error));
        }finally{
            setLoading(false);
        }
    };

    return {loading, createRoute};
}