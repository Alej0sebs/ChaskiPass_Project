import { Request, Response } from 'express';
import { busRegisterService, getBusesService, editBusByIdService, deleteBusByIdService } from '../services/buses.services';
import { HandleMessages } from '../error/handleMessages.error';
import { BusT } from '../types/index.types';

// Registrar un nuevo bus
export const busRegister = async (req: Request, res: Response) => {
    try {
        const { cooperative_id} = req.userReq ?? {};
        const { bus_number, license_plate, chassis_vin, bus_manufacturer, model, year, capacity, picture } = req.body;

        const busInformation:BusT={
            id: 0,
            bus_number,
            license_plate,
            chassis_vin,
            bus_manufacturer,
            model,
            year,
            capacity,
            picture,
            cooperative_id: cooperative_id || ''
        }
        const result = await busRegisterService(busInformation);

        res.status(result.status).json(result.json);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};

// Obtener buses de una cooperativa
export const getBuses = async (req: Request, res: Response) => {
    try {
        const { cooperative_id } = req.userReq ?? {};

        const result = await getBusesService(cooperative_id!);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};

// Editar un bus por ID
export const editBusById = async (req: Request, res: Response) => {
    try {
        const { cooperative_id} = req.userReq ?? {};
        const { id } = req.params;
        const { bus_number, license_plate, chassis_vin, bus_manufacturer, model, year, capacity, picture } = req.body;
        const busInformation:BusT={
            id: parseInt(id),
            bus_number,
            license_plate,
            chassis_vin,
            bus_manufacturer,
            model,
            year,
            capacity,
            picture,
            cooperative_id: cooperative_id || ''
        }
        const result = await editBusByIdService(busInformation);

        res.status(result.status).json(result.json);
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};

// Eliminar un bus por ID
export const deleteBusById = async (req: Request, res: Response) => {
    try {
        const { cooperative_id} = req.userReq ?? {};
        const { id } = req.params;

        const result = await deleteBusByIdService(id, cooperative_id!);

        res.status(result.status).json(result.json);
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};
