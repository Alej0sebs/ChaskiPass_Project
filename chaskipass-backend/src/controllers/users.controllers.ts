import { HandleMessages } from './../error/handleMessages.error';
import { Request, Response } from 'express';
import { createUserService, getDriversService, getPaginatedUsersService, getUserByIdService, getUsersService, searchUserByFilterService, updateUserService } from '../services/users.services';
import { sendEmail } from '../services/mail.services';
import { getPaginationData } from '../utils/helpers.utils';

// Obtener lista de usuarios con paginación
export const getUsers = async (req: Request, res: Response) => {
    try {
        const { cooperative_id, dni } = req.userReq ?? {};
        const result = await getUsersService(cooperative_id!, dni!);

        res.status(201).json(result);
        return;
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};

export const getUsersPaginated = async (req: Request, res: Response) => {
    try {
        const { cooperative_id, dni } = req.userReq ?? {};
        const paginationData = getPaginationData(req.query);
        const result = await getPaginatedUsersService(cooperative_id!, dni!, paginationData);
        res.status(201).json(result);
        return;
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};

//Lista de usuario por DNI
export const getUserById = async (req: Request, res: Response) => {
    try {
        //:dni
        const { dni } = req.params;
        const result = await getUserByIdService(dni);
        res.status(201).json(result);
        return;
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};

// Buscar usuarios con filtro
export const searchUserByFilter = async (req: Request, res: Response) => {
    try {
        const { cooperative_id, dni } = req.userReq ?? {};
        const paginationData = getPaginationData(req.query, req.query.pattern as string);
        // Llamar al servicio de búsqueda de usuarios
        const result = await searchUserByFilterService(cooperative_id!, dni!, paginationData);

        res.status(201).json(result);
        return;
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};


export const getDrivers = async (req:Request, res:Response) => {
    try{
        const { cooperative_id} = req.userReq ?? {};
        const result = await getDriversService(cooperative_id!);
        res.status(201).json(result);
        return;
    }catch(error){
        res.status(500).json({msg:HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
}

// Registrar usuario y enviar correo
export const registerAndSendEmail = async (req: Request, res: Response) => {
    try {
        let { dni, name, last_name, user_name, email, phone, address, role_id, cooperative_id } = req.body;
        // Generar contraseña aleatoria
        const password = generateRandomPassword();
        
        if(cooperative_id === undefined || cooperative_id === null || cooperative_id===''){
            cooperative_id = req.userReq?.cooperative_id;
        }
        // Crear el usuario llamando a la lógica de negocio
        const result = await createUserService({
            dni, name, last_name, user_name, email, phone, password, address, role_id, cooperative_id
            
        });


        if (result.status !== 201) {
            res.status(result.status).json({msg:HandleMessages.USER_CREATED_SUCCESSFULLY});
            return;
        }


        // Enviar el correo si el usuario se creó
        await sendEmail(email, generateMailMessage(password, name));
        res.status(result.status).json(result.json);
        return;
    } catch (error) {
        console.error('Error en el registro y envío de correo:', error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { dni, name, last_name, user_name, phone, address, role_id, password } = req.body;
    const result = await updateUserService({ dni, name, last_name, user_name, phone, address, password });
    if (result.status !== 201) {
        res.status(result.status).json(result.json);
        return;
    }
    res.status(result.status).json(result.json);
    return;
};


// Generar contraseña aleatoria
const generateRandomPassword = (): string => {
    return Math.random().toString(36).slice(-8);
};

const generateMailMessage = (password: string, user_name: string) => {
    const html: string = `
            <h1>Bienvenido a Ruta593</h1>
            <p>Hola <strong>${user_name}</strong>,</p>
            <p>Gracias por registrarte en nuestra plataforma. Aquí tienes tu contraseña temporal:</p>
            <p style="font-size: 18px; font-weight: bold;">${password}</p>
            <p>Por favor, cámbiala después de iniciar sesión.</p>
            <p>Saludos,<br/>El equipo de Ruta593</p>
        `
    return html;
}