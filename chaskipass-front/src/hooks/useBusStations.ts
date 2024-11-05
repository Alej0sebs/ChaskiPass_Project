import { useEffect, useState } from "react";
import { API_BASE_URL } from "../helpers/Constants";
import { verifyError } from "../helpers/VerifyErrors";
import toast from "react-hot-toast";
import { BusStationT } from "../types";



export default function useBusStations() {
    const [loading, setLoading] = useState(false);
    const [dataListBusStations, setdataListBusStations] = useState<BusStationT[]>([]);

    const getBusStations = async()=>{
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}linkedStations/allLinkedCooperatives/`, {
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
            const formattedData= data.json.list.map((station:BusStationT)=>({
                id:station.id,
                name:station.name,
                city_bus_station:{
                    id: station.city_bus_station.id,
                    name: station.city_bus_station.name
                }
            }));
            return formattedData;
        } catch (error) {
            toast.error(verifyError(error));
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        getBusStations().then((data)=>{
            setdataListBusStations(data);
        })
    }, [])

    return{
        dataListBusStations,
        loading,
    }
};