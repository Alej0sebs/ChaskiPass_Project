import { Request, Response } from 'express';
import { createRouteService, createFrequencyService } from '../services/routes.services';
import { HandleMessages } from '../error/handleMessages.error';
import { RoutesT } from '../types/index.types';

// Crear una nueva ruta
export const createRoute = async (req: Request, res: Response) => {
    try {
        const { cooperative_id, dni } = req.userReq ?? {};
        const { departure_station_id, arrival_station_id, stopOverList } = req.body;
        const routeInformation:RoutesT = {
            id: '',
            dni: dni || '',
            cooperative_id: cooperative_id || '',
            departure_station_id,
            arrival_station_id,
            stopOverList
        }
        const result = await createRouteService(routeInformation);

        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};

// Crear una nueva frecuencia
export const createFrequency = async (req: Request, res: Response) => {
    try {
        const { cooperative_id, dni } = req.userReq ?? {};
        const { id, bus_id, route_id, date, departure_time, arrival_time } = req.body;

        const result = await createFrequencyService(cooperative_id as string, dni as string, id, bus_id, route_id, date, departure_time, arrival_time);

        res.status(result.status).json(result.json);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};
