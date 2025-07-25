import bcrypt from "bcrypt";
import { Users } from "../models/users.models";
import { Op } from "sequelize";
import generateTokenAndSetCookie from "../utils/generateToken.utils";
import { HandleMessages } from "../error/handleMessages.error";
import { Response } from "express";
import { SaasAdminLoginT, UserLoginT } from "../types/index.types";
import { handleSequelizeError } from "../utils/helpers.utils";
import Roles from "../models/roles.models";
import { RoleEnum } from "../utils/enums.utils";
import Cooperatives from "../models/cooperatives.models";
import { Admin } from "../models/administrators.models";

// Servicio para iniciar sesión
export const loginUserService = async (
    { user_name,
        email,
        password }: UserLoginT,
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

        const logoRoute = await Cooperatives.findOne({
            where: { id: user.cooperative_id },
            attributes: ["logo"]
        });
        // Generar token y establecer cookie
        generateTokenAndSetCookie(user.dni, res);

        return {
            status: 200,
            json: {
                full_name: user.name + " " + user.last_name,
                dni: user.dni,
                cooperative: user.cooperative_id,
                role: user.role_id,
                logo: logoRoute?.logo,
            }
        };
    } catch (error) {
        return handleSequelizeError(error);
    }
};

//Servicio ingreso superAdmin
export const loginSuperAdminService = async (
    { user_name, email, password }: SaasAdminLoginT,
    res: Response
) => {
    try {
        const admin = await Admin.findOne({
            where: {
                [Op.or]: [{ user_name }, { email }]
            }
        }) as Admin;
        if (!admin || !(await bcrypt.compare(password, admin?.password || ""))) {
            return {
                status: 404,
                json: { error: HandleMessages.INVALID_CREDENTIALS }
            };
        }
        // Generar token y establecer cookie
        generateTokenAndSetCookie(admin.dni, res);

        return {
            status: 200,
            json: {
                user_name: admin.user_name,
                dni: admin.dni,
                email: admin.email,
                role: admin.role_id
            }
        };
    } catch (error) {
        return handleSequelizeError(error);
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
        return handleSequelizeError(error);
    }
};
