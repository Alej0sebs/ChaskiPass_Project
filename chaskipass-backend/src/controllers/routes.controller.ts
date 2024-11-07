import { Request, Response } from 'express';
import { createRouteService, getRoutesService } from '../services/routes.services';
import { HandleMessages } from '../error/handleMessages.error';
import { FrequencyT, RoutesT } from '../types/index.types';
import { getPaginationData } from '../utils/helpers.utils';
import { createFrequencyService, deleteFrequencyByIDService, editFrequencyService, getFrequenciesService } from '../services/frequencies.services';

// Crear una nueva ruta
export const createRoute = async (req: Request, res: Response) => {
    try {
        const { cooperative_id, dni } = req.userReq ?? {};
        const { departure_station_id, arrival_station_id, stopOverList } = req.body;
        const routeInformation: RoutesT = {
            id: '',
            dni: dni || '',
            cooperative_id: cooperative_id || '',
            departure_station_id,
            arrival_station_id,
            stopOverList
        }
        const result = await createRouteService(routeInformation);

        res.status(201).json(result);
        return;
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};

// Crear una nueva frecuencia
export const createFrequency = async (req: Request, res: Response) => {
    try {
        const { cooperative_id } = req.userReq ?? {};
        const { bus_id, route_id, departure_time, arrival_time, price, status, driver_id, date } = req.body;

        const frequencyInformation: FrequencyT = {
            cooperative_id: cooperative_id || '',
            bus_id,
            route_id,
            driver_id,
            date,
            departure_time,
            arrival_time,
            price,
            status,
        }
        const result = await createFrequencyService(frequencyInformation);
        res.status(result.status).json(result.json);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};

export const getRoutes = async (req: Request, res: Response) => {
    try{
        const {cooperative_id} = req.userReq ?? {};
        const paginationData = getPaginationData(req.query, req.query.pattern as string);
        const result= await getRoutesService(cooperative_id as string, paginationData);
        res.status(200).json(result);
        return
    }catch(error){
        res.status(500).json({msg: HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
};

export const getFrequencies = async (req: Request, res: Response) => {
    try{
        const {cooperative_id} = req.userReq ?? {};
        const result = await getFrequenciesService(cooperative_id as string);
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({msg: HandleMessages.INTERNAL_SERVER_ERROR});
        return
    }
};

export const editFrequency = async (req:Request, res:Response) => {
    try{
        const {id,bus_id, driver_id, date, departure_time, arrival_time, price, status} = req.body;
        const result = await editFrequencyService({id, bus_id, driver_id, date, departure_time, arrival_time, price, status});
        res.status(200).json(result);
        return;
    }catch(error){
        res.status(500).json({msg: HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
};

export const deleteFrequencyByID = async (req:Request, res:Response) => {
    try{
        const {id} = req.body;
        const result = await deleteFrequencyByIDService(id);
        res.status(200).json(result);
        return;
    }catch(error){
        res.status(500).json({msg: HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
};


