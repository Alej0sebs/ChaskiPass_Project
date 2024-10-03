import { ClientCooperatives } from './../models/clientCooperatives';
import { Clients } from './../models/clients.models';
import { Request, Response } from 'express';
import { HandleMessages } from '../error/handleMessages.error';
import { Op } from 'sequelize';


export const getClients = async (req: Request, res: Response) => {
    try {
        const { dni } = req.userReq ?? {};

        const clientsList = await Clients.findAll({
            where: {
                dni: {
                    [Op.ne]: dni 
                }
            },
            include: [
                {
                    model: ClientCooperatives, 
                    required: false 
                }
            ]
        });
        res.status(200).json(clientsList);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};


export const createClient = async (req: Request, res: Response) => {
    try {
        const { dni, name, last_name, email, phone, address, cooperative_id } = req.body; // Get cooperative_ids

        const clientExists = await Clients.findOne({
            where: { dni },
        });

        if (clientExists) {
            return res.status(400).json({
                error: 'Client with this DNI already exists',
            });
        }
        const newClient = await Clients.create({
            dni,
            name,
            last_name,
            email,
            phone,
            address
        });

        if (cooperative_id && cooperative_id.length > 0) {
            await newClient.set(cooperative_id); 
        }

        return res.status(201).json({
            message: 'Client created successfully',
            client: newClient,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};


export const updateClient = async (req: Request, res: Response) => {
    try {
        const { dni } = req.params; 
        const { name, last_name, email, phone, address, cooperative_id } = req.body; // Include cooperative_ids for updates

        const client = await Clients.findOne({
            where: { dni },
        });

        if (!client) {
            return res.status(404).json({
                error: 'Client not found',
            });
        }

        await client.update({
            name,
            last_name,
            email,
            phone,
            address
        });

        if (cooperative_id && cooperative_id.length > 0) {
            await client.set(cooperative_id); 
        }

        return res.status(200).json({
            message: 'Client updated successfully',
            client,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};
