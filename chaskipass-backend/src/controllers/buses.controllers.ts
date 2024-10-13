import { Request, Response } from 'express';
import { busRegisterService, getBusesService, editBusByIdService, deleteBusByIdService } from '../services/buses.services';
import { HandleMessages } from '../error/handleMessages.error';
import { BusT } from '../types/index.types';

// Registrar un nuevo bus
export const busRegister = async (req: Request, res: Response) => {
    try {
        const { cooperative_id} = req.userReq ?? {};
        const { bus_number, license_plate, chassis_vin, bus_manufacturer, model, year, capacity, picture, } = req.body;

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
            cooperative_id: cooperative_id || '',
            bus_structure_id: 0 // necesito estructuras de buses antes de guardar
        }
        const result = await busRegisterService(busInformation);

        res.status(result.status).json(result.json);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};

// Obtener buses de una cooperativa
export const getBuses = async (req: Request, res: Response) => {
    try {
        const { cooperative_id } = req.userReq ?? {};

        const result = await getBusesService(cooperative_id!);
        res.status(201).json(result);
        return;
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
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
            cooperative_id: cooperative_id || '',
            bus_structure_id: 0
        }
        const result = await editBusByIdService(busInformation);

        res.status(result.status).json(result.json);
        return;
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};

// Eliminar un bus por ID
export const deleteBusById = async (req: Request, res: Response) => {
    try {
        const { cooperative_id} = req.userReq ?? {};
        const { id } = req.params;

        const result = await deleteBusByIdService(id, cooperative_id!);

        res.status(result.status).json(result.json);
        return;
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};
