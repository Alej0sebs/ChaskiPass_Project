import { Request, Response } from 'express';
import { getSeatsService, createSeatService, updateSeatService, deleteSeatService } from '../services/seats.services';
import { HandleMessages } from '../error/handleMessages.error';
import { getPaginationData } from '../utils/helpers.utils';

// Obtener asientos por bus_id
export const getSeats = async (req: Request, res: Response) => {
    try {
        const { bus_id } = req.query;
        const paginationData = getPaginationData(req.query);

        if (typeof bus_id !== 'string') {
            res.status(400).json({ message: 'bus_id debe ser una cadena' });
            return;
        }

        const result = await getSeatsService(bus_id, paginationData);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};

// Crear un nuevo asiento
export const createSeat = async (req: Request, res: Response) => {
    try {
        const { bus_id, number_seat, type_seat_id } = req.body;

        const result = await createSeatService(bus_id, number_seat, type_seat_id);
        res.status(result.status).json(result.json);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};

// Actualizar un asiento existente
export const updateSeat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { number_seat, type_seat_id } = req.body;

        const result = await updateSeatService(id, number_seat, type_seat_id);
        res.status(result.status).json(result.json);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};

// Eliminar un asiento
export const deleteSeat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await deleteSeatService(id);
        res.status(result.status).json(result.json);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};
