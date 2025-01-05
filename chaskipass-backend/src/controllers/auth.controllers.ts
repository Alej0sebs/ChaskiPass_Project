import { Request, Response } from "express";
import { loginSuperAdminService, loginUserService, logoutUserService } from "../services/auth.services";
import { HandleMessages } from "../error/handleMessages.error";

// Controlador para iniciar sesión
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { user_name, email, password } = req.body;
        const result = await loginUserService({user_name, email, password}, res);
        res.status(result.status).json(result.json);
        return;
    } catch (error) {
        res.status(500).json({
            error: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};

export const loginAdmin  = async (req: Request, res: Response) => {
    try {
        const { user_name, email, password } = req.body;
        const result = await loginSuperAdminService({user_name, email, password}, res);
        res.status(result.status).json(result.json);
        return;
    } catch (error) {
        res.status(500).json({
            error: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};

// Controlador para cerrar sesión
export const logoutUser = async (req: Request, res: Response) => {
    try {
        const result = await logoutUserService(res);
        res.status(result.status).json(result.json);
        return;
    } catch (error) {
        res.status(500).json({
            error: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};
