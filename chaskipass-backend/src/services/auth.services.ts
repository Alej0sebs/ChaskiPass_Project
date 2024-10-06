import bcrypt from "bcrypt";
import { Users } from "../models/users.models";
import { Op } from "sequelize";
import generateTokenAndSetCookie from "../utils/generateToken.utils";
import { HandleMessages } from "../error/handleMessages.error";
import { Response } from "express";
import { UserLoginT } from "../types/index.types";

// Servicio para iniciar sesión
export const loginUserService = async (
    {user_name,
    email,
    password}:UserLoginT,
    res: Response
) => {
    try {
        const user = await Users.findOne({
            where: {
                [Op.or]: [{ user_name }, { email }]
            }
        }) as Users;

        if (!user || !(await bcrypt.compare(password, user?.password || ""))) {
            return {
                status: 404,
                json: { error: HandleMessages.INVALID_CREDENTIALS }
            };
        }

        // Generar token y establecer cookie
        generateTokenAndSetCookie(user.dni, res);

        return {
            status: 200,
            json: {
                dni: user.dni,
                cooperative: user.cooperative_id
            }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            json: { error: HandleMessages.INTERNAL_SERVER_ERROR }
        };
    }
};

// Servicio para cerrar sesión
export const logoutUserService = async (res: Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return {
            status: 200,
            json: { message: HandleMessages.SUCCESSFULLY_LOGGED_OUT }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            json: { error: HandleMessages.INTERNAL_SERVER_ERROR }
        };
    }
};
