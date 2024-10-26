import { Request, Response } from 'express';
import { createRouteService, createFrequencyService } from '../services/routes.services';
import { HandleMessages } from '../error/handleMessages.error';
import { FrequencyT, RoutesT } from '../types/index.types';

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
        const { bus_id, route_id, departure_time, arrival_time, price, status } = req.body;

        const frequencyInformation: FrequencyT = {
            cooperative_id: cooperative_id || '',
            bus_id,
            route_id,
            date: new Date(),
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


