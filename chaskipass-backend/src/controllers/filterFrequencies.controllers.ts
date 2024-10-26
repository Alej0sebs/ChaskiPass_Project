import { Request, Response } from 'express';
import { filterFrequenciesService } from '../services/filterFrequencies.services';
import { FilterFrequenciesT } from '../types/index.types';
import { HandleMessages } from '../error/handleMessages.error';
import { getPaginationData } from '../utils/helpers.utils';
export const filterFrequencies= async(req:Request, res:Response) => {
    try{
        const { cooperative_id, date, departure_time, arrival_time, price, trip_type, departure_city,arrival_city, page, limit } = req.body;
        const paginationData = getPaginationData(req.query);
        const values:FilterFrequenciesT = {
            cooperative_id: cooperative_id as string || '',
            date: date as Date || null,
            departure_time: departure_time as string || '',
            arrival_time: arrival_time as string || '',
            price: price as number || 0,
            trip_type: trip_type as boolean,
            departure_city: departure_city as string || '',
            arrival_city: arrival_city as string || '',
        };
        const result = await filterFrequenciesService(values, paginationData);
        res.status(result.status).json(result.json);
        return;
    }catch(error){
        res.status(500).json({msg: HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
}