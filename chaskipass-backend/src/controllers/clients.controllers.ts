import { Request, Response } from 'express';
import { getClientsService, createClientService, updateClientService, deleteClientService } from '../services/clients.services';
import { HandleMessages } from '../error/handleMessages.error';
import Clients from '../models/clients.models';
import { getPaginationData } from '../utils/helpers.utils';

// Obtener lista de clientes con paginación
export const getClients = async (req: Request, res: Response) => {
    try {
        const { dni } = req.userReq ?? {};
        const paginationData = getPaginationData(req.query);
        const result = await getClientsService(dni as string, paginationData);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};

// Crear un nuevo cliente
export const createClient = async (req: Request, res: Response) => {
    try {
        const { dni, name, last_name, email, phone, address } = req.body;
        const result = await createClientService({ dni, name, last_name, email, phone, address });
        res.status(result.status).json(result.json);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};

// Actualizar un cliente existente
export const updateClient = async (req: Request, res: Response) => {
    try {
        const { dni } = req.params;
        const { name, last_name, email, phone, address} = req.body;

        const result = await updateClientService({ dni, name, last_name, email, phone, address});
        res.status(result.status).json(result.json);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};

// Eliminar un cliente
export const deleteClient = async (req: Request, res: Response) => {
    try {
        const { dni } = req.params;

        const result = await deleteClientService(dni as string);
        res.status(result.status).json(result.json);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};
