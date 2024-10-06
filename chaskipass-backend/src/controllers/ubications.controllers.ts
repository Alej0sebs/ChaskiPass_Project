import { Request, Response } from 'express';
import { getCitiesService, searchCitiesByFilterService } from '../services/ubications.services';
import { HandleMessages } from '../error/handleMessages.error';
import { getPaginationData } from '../utils/helpers.utils';

export const getCities = async (req: Request, res: Response) => {
    try {
        const paginationData = getPaginationData(req.query);
        // Llamar al servicio para obtener la lista de ciudades
        const result = await getCitiesService(paginationData);

        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};

export const searchCitiesByFilter = async (req: Request, res: Response) => {
    try {
        const paginationData = getPaginationData(req.query, req.query.pattern as string);
        // Llamar al servicio para buscar las ciudades por filtro
        const result = await searchCitiesByFilterService(paginationData);

        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};
