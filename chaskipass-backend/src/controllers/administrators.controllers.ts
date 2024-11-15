import { Request, Response } from 'express';
import {
    createSaasAdministratorService,
    createCooperativeService,
    createRoleService,
    createNewStationService
} from '../services/administrators.services';
import { HandleMessages } from '../error/handleMessages.error';
import { NewStationT } from '../types/index.types';

// Crear un administrador SaaS
export const createSaasAdministrator = async (req: Request, res: Response) => {
    try {
        const { dni, user_name, email, password } = req.body;
        const result = await createSaasAdministratorService({dni, user_name, email, password, role_id: ''});
        res.status(result.status).json(result.json);
        return;
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};


// Crear una cooperativa
export const createCooperative = async (req: Request, res: Response) => {
    try {
        const { id, name, address, phone, email, logo } = req.body;
        const result = await createCooperativeService({id, name, address, phone, email, logo});
        res.status(result.status).json(result.json);
        return;
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};

// Crear un rol
export const createRoles = async (req: Request, res: Response) => {
    try {
        const { id, name, description } = req.body;
        const result = await createRoleService({id, name, description});
        res.status(result.status).json(result.json);
        return;
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};


export const createNewStation= async (req: Request, res: Response) => {
    try{
        const {city_id, name, address, phone, open_time, close_time} = req.body;
        const values: NewStationT = {
            id: 0,
            city_id: city_id as string,
            name: name as string,
            address: address as string,
            phone: phone as string,
            open_time: open_time as string,
            close_time: close_time as string
        }
        const result = await createNewStationService(values);
        if(result.status !== 201){
            res.status(result.status).json(result.json);
            return;
        }
        res.status(result.status).json(result.json);
        return;

    }catch(error){
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};


