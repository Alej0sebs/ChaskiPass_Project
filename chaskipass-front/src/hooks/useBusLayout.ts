import { useState } from "react";

export default function useBusLayout(){
    const [loading, setLoading] = useState(true);
    const [busLayout, setBusLayout] = useState([]);

    const sendBusLayout = async () => {
        setLoading(true);
        try{
            const res= await fetch('http://localhost:3001/busLayout');
            const data = await res.json();
        }catch(error){
            // throw new Error(error);
        }
    };

}