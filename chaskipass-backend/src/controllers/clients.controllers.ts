import { ClientCooperatives } from './../models/clientCooperatives';
import { Clients } from './../models/clients.models';
import { Request, Response } from 'express';
import { HandleMessages } from '../error/handleMessages.error';
import { Op } from 'sequelize';


export const getClients = async (req: Request, res: Response) => {
    try {
        const { dni } = req.userReq ?? {};

        const { page = 1, limit = 10 } = req.query;
        const offset = page ? (parseInt(page.toString()) - 1) * (limit ? parseInt(limit.toString()) : 10) : 0;

        const { rows: clientsList, count: totalItems } = await Clients.findAndCountAll({
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
            ],
            limit: parseInt(limit.toString()),
            offset: offset 
        });

        const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

        res.status(201).json({
            totalItems,
            totalPages,
            currentPage: parseInt(page.toString()),
            list: clientsList
        });
        return;
    } catch (error) {
        console.log(error);
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
                error: HandleMessages.CLIENT_EXIST_DNI,
            });
            return;
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
            message: HandleMessages.CLIENT_CRTEATED_SUCESSFULLY,
            client: newClient,
        });
        
        return;

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};


export const updateClient = async (req: Request, res: Response) => {
    try {
        const { dni } = req.params; 
        const { name, last_name, email, phone, address, cooperative_id } = req.body; 

        const client = await Clients.findOne({
            where: { dni },
        });

        if (!client) {
            return res.status(404).json({
                error: HandleMessages.CLIENT_NOT_FOUND,
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
            message: HandleMessages.CLIENT_UPDATE_SUCESSFULLY,
            client,
        });
        return;
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
    return;
};

export const deleteClient = async (req: Request, res: Response) => {
    try {
        const { dni } = req.params; 

        // Buscar el cliente por DNI
        const client = await Clients.findOne({
            where: { dni },
        });

        if (!client) {
            return res.status(404).json({
                error: HandleMessages.CLIENT_NOT_FOUND
            });
    return;

        }
        await client.destroy();

        return res.status(200).json({
            message: HandleMessages.CLIENT_DELTETE_SUCESSFULLY
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};

