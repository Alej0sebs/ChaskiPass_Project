import { Request, Response } from 'express';
import { HandleMessages } from '../error/handleMessages.error';
import { createUserLogic, getUsersService, searchUserByFilterService} from '../services/users.services';
import { sendEmail } from '../services/mail.services';


// Obtener lista de usuarios con paginación
export const getUsers = async (req: Request, res: Response) => {
    try {
        const { cooperative_id, dni } = req.userReq ?? {};
        const { page = 1, limit = 10 } = req.query;

        // Llamar al servicio para obtener la lista de usuarios
        const result = await getUsersService(cooperative_id!, dni!, page, limit);
        
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};

// Buscar usuarios con filtro
export const searchUserByFilter = async (req: Request, res: Response) => {
    try {
        const { cooperative_id, dni } = req.userReq ?? {};
        const { page = 1, limit = 10, pattern } = req.query;

        // Llamar al servicio de búsqueda de usuarios
        const result = await searchUserByFilterService(cooperative_id!, dni!, pattern as string, page, limit);
        
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};

// Registrar usuario y enviar correo
export const registerAndSendEmail = async (req: Request, res: Response) => {
    try {
        const { dni, name, last_name, user_name, email, phone, address, role_id, cooperative_id } = req.body;

        // Generar contraseña aleatoria
        const password = generateRandomPassword();

        // Crear el usuario llamando a la lógica de negocio
        const result = await createUserLogic({
            dni, name, last_name, user_name, email, phone, password, address, role_id, cooperative_id
        });

        if (result.status !== 201) {
            res.status(result.status).json(result.json);
            return;
        }

        // Enviar el correo si el usuario se creó
        await sendEmail(email, password, user_name);

        res.status(201).json({
            msg: "Usuario registrado y correo enviado con éxito"
        });
    } catch (error) {
        console.error('Error en el registro y envío de correo:', error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};

// Generar contraseña aleatoria
const generateRandomPassword = (): string => {
    return Math.random().toString(36).slice(-8);
};
