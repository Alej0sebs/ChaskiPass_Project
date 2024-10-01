import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ErrorMessages } from "../error/errorMessages.error";
import { Users } from "../models/users.models";
import { Op } from "sequelize";
import { UserLoginT } from "../types/index.types";


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const user:UserLoginT= await Users.findOne({
            where: {
            [Op.or]: [
                { user_name: username },
                { email: email }
            ]
            }
        })as UserLoginT;
        const isPasswordValid = await bcrypt.compare(password, user?.password );
        if (!user) {
            res.status(404).json({
                error: ErrorMessages.USER_NOT_FOUND
            });
        }
    } catch (error) {
        res.status(500).json({
            error: ErrorMessages.INTERNAL_SERVER_ERROR
        });
    }
}