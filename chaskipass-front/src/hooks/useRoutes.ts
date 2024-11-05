import { useEffect, useState } from "react";
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
    //Listado de las rutas
    const [listRoutes, setListRoutes] = useState<any[]>([]);

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
            return true;
        } catch (error) {
            toast.error(verifyError(error));
            return false;
        }finally{
            setLoading(false);
        }
    };

    const getRoutes = async()=>{
        setLoading(true);
        try {
            const response:Response = await fetch(`${API_BASE_URL}frequency/routes`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                },
                credentials:'include',
            });
            const data = await response.json();
            if(data.error || response.status !== 200){
                throw new Error(data.error);
            }
            return data.json.listRoutes;
        } catch (error) {
            console.log(error);
            toast.error(verifyError(error));
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        getRoutes().then((data) =>{
            setListRoutes(data);
        })
    }, []);

    return {loading, createRoute, listRoutes};
}