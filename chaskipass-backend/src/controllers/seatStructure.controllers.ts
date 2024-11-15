import { Request, Response } from 'express';
import { SeatsStructureT } from '../types/index.types';
import { getSeatsStructureService } from '../services/seatsStructure.services';

export const getSeatsStructure = async (req: Request, res: Response) => {
    try{
        const {cooperative_id} = req.userReq ?? {};
        const {bus_id, frequency_id, bus_structure_id} = req.body;
        const seatStatusData:SeatsStructureT = {
            cooperative_id: cooperative_id || '',
            bus_id,
            frequency_id,
            bus_structure_id
        };
        const result = await getSeatsStructureService(seatStatusData);
        res.status(200).json(result);
        return;
    }catch(error){
        res.status(500).json({msg: 'Error al obtener los datos de getSeatsStructure'});
        return; 
    }
}