import { Request, Response } from 'express';
import { HandleMessages } from '../error/handleMessages.error';
import { createUserLogic, getUsersService, searchUserByFilterService } from '../services/users.services';
import { sendEmail } from '../services/mail.services';
import { getPaginationData } from '../utils/helpers.utils';


// Obtener lista de usuarios con paginación
export const getUsers = async (req: Request, res: Response) => {
    try {
        const { cooperative_id, dni } = req.userReq ?? {};
        const paginationData = getPaginationData(req.query);
        const result = await getUsersService(cooperative_id!, dni!, paginationData);

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
        await sendEmail(email, generateMailMessage(password, name));

        res.status(201).json({
            msg: "Usuario registrado y correo enviado con éxito"
        });
        return;
    } catch (error) {
        console.error('Error en el registro y envío de correo:', error);
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};

// Generar contraseña aleatoria
const generateRandomPassword = (): string => {
    return Math.random().toString(36).slice(-8);
};

const generateMailMessage = (password: string, user_name: string) => {
    const html: string = `
            <h1>Bienvenido a ChaskiPass</h1>
            <p>Hola <strong>${user_name}</strong>,</p>
            <p>Gracias por registrarte en nuestra plataforma. Aquí tienes tu contraseña temporal:</p>
            <p style="font-size: 18px; font-weight: bold;">${password}</p>
            <p>Por favor, cámbiala después de iniciar sesión.</p>
            <p>Saludos,<br/>El equipo de ChaskiPass</p>
        `
    return html;
}