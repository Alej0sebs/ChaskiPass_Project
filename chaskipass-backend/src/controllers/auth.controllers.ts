import { Request, Response } from "express";
import { loginUserService, logoutUserService } from "../services/auth.services";
import { HandleMessages } from "../error/handleMessages.error";

// Controlador para iniciar sesión
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { user_name, email, password } = req.body;
        const result = await loginUserService({user_name, email, password}, res);
        res.status(result.status).json(result.json);
    } catch (error) {
        res.status(500).json({
            error: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};

// Controlador para cerrar sesión
export const logoutUser = async (req: Request, res: Response) => {
    try {
        const result = await logoutUserService(res);
        res.status(result.status).json(result.json);
    } catch (error) {
        res.status(500).json({
            error: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};
