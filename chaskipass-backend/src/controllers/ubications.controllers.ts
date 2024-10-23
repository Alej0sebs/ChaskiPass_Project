import { Request, Response } from 'express';
import { getBusStationService, getCitiesService, searchCitiesByFilterService } from '../services/ubications.services';
import { HandleMessages } from '../error/handleMessages.error';
import { getPaginationData } from '../utils/helpers.utils';
import BusStations from '../models/busStations.models';


export const getCities = async (req: Request, res: Response) => {
    try {
        const paginationData = getPaginationData(req.query);
        // Llamar al servicio para obtener la lista de ciudades
        const result = await getCitiesService(paginationData);

        res.status(201).json(result);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};

export const searchCitiesByFilter = async (req: Request, res: Response) => {
    try {
        const paginationData = getPaginationData(req.query, req.query.pattern as string);
        // Llamar al servicio para buscar las ciudades por filtro
        const result = await searchCitiesByFilterService(paginationData);

        res.status(201).json(result);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};

export const getBusStation = async (req: Request, res: Response) => {
    try {
        const result = await getBusStationService();

        if (result.status !== 200) {
            res.status(result.status).json(result.json);
            return;
        }

        const busStations = result.json as BusStations[];
        if (busStations.length === 0) {
            res.status(404).json({ msg: HandleMessages.BUS_STATION_EMPTY });
            return;
        }

        res.status(200).json(busStations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};


