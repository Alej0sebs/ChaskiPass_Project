import { Clients } from '../models/clients.models';
import { ClientCooperatives } from '../models/clientCooperatives';
import { HandleMessages } from '../error/handleMessages.error';
import { Op } from 'sequelize';
import { ClientsT, DataPaginationT } from '../types/index.types';
import { handleSequelizeError } from '../utils/helpers.utils';

// Servicio para obtener clientes con paginación
export const getClientsService = async (dni: string, { page, limit }: DataPaginationT) => {
    try {
        const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

        const { rows: clientsList, count: totalItems } = await Clients.findAndCountAll({
            where: { dni: { [Op.ne]: dni } },
            include: [{ model: ClientCooperatives, required: false, attributes: ['cooperative_id'] }],
            limit: parseInt(limit.toString()),
            offset: offset
        });

        const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

        return {
            status: 200,
            json: {
                totalItems,
                totalPages,
                currentPage: parseInt(page.toString()),
                list: clientsList
            }
        };
    } catch (error) {
        return handleSequelizeError(error);
    }
};

export const getClientByDNIService = async (dni:string) => {
    try{
        const client = await Clients.findOne({where:{dni}});
        if(!client){
            return {status:404, json:{error:HandleMessages.CLIENT_NOT_FOUND}}
        }
        return {status:200, json:{client}};
    }catch(error){
        return handleSequelizeError(error);
    }
};


// Servicio para crear un nuevo cliente
export const createClientService = async ({ dni, name, last_name, email, phone, address }: ClientsT) => {
    try {
        const clientExists = await Clients.findOne({ where: { dni } });

        if (clientExists) {
            return { status: 400, json: { error: HandleMessages.CLIENT_EXIST_DNI } };
        }

        const newClient = await Clients.create({
            dni,
            name,
            last_name,
            email,
            phone,
            address
        });

        return { status: 201, json: { message: HandleMessages.CLIENT_CRTEATED_SUCESSFULLY, client: newClient } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};


// Servicio para actualizar un cliente
export const updateClientService = async ({ dni, name, last_name, email, phone, address }: ClientsT) => {
    try {
        const client = await Clients.findOne({ where: { dni } });

        if (!client) {
            return { status: 404, json: { error: HandleMessages.CLIENT_NOT_FOUND } };
        }

        // Actualizar cliente
        await client.update({
            name,
            last_name,
            email,
            phone,
            address
        });

        return { status: 200, json: { message: HandleMessages.CLIENT_UPDATE_SUCESSFULLY, client } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};


// Servicio para eliminar un cliente
export const deleteClientService = async (dni: string) => {
    try {
        const client = await Clients.findOne({ where: { dni } });

        if (!client) {
            return { status: 404, json: { error: HandleMessages.CLIENT_NOT_FOUND } };
        }

        // Eliminar cliente
        await client.destroy();

        return { status: 200, json: { message: HandleMessages.CLIENT_DELTETE_SUCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};

