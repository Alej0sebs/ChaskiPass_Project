import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { HandleMessages } from "../error/handleMessages.error";
import { Users } from "../models/users.models";
import { Op } from "sequelize";
import generateTokenAndSetCookie from "../utils/generateToken.utils";


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { user_name, email, password } = req.body;
        const user: Users = await Users.findOne({
            where: {
                [Op.or]: [
                    { user_name },
                    { email }
                ]
            }
        }) as Users;
        const isPasswordValid = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordValid) {
            res.status(404).json({
                error: HandleMessages.INVALID_CREDENTIALS
            });
            return;
        };
        //generate token and set cookie
        generateTokenAndSetCookie(user.dni, res);
        res.status(200).json({
            dni: user.dni,
            cooperative: user.cooperative_id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
}


export const logoutUser = async (req: Request, res: Response) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({
            message: HandleMessages.SUCCESSFULLY_LOGGED_OUT
        });
    } catch (error) {
        res.status(500).json({
            error: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};