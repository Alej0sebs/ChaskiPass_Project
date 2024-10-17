import { Request, Response } from 'express';
import {
    createSaasAdministratorService,
    createNewTenantService,
    createCooperativeService,
    createRoleService
} from '../services/administrators.services';
import { HandleMessages } from '../error/handleMessages.error';

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

};
