import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Users } from '../models/users.models';
import { HandleMessages } from '../error/handleMessages.error';
import { Op } from 'sequelize';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const { cooperative_id, dni } = req.userReq ?? {};
        const usersList = await Users.findAll({
            where: {
                cooperative_id,
                dni: {
                    [Op.ne]: dni
                }
            },
            attributes: { exclude: ['password'] }
        });
        res.status(201).json(usersList);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};


export const createUserCooperative = async (req: Request, res: Response) => {
    try {
        const { dni, name, last_name, user_name, email, phone, password, confirmPassword, address, role_id, cooperative_id } = req.body;
        if (password !== confirmPassword) {
            res.status(400).json({
                error: HandleMessages.COMPARE_PASSWORD
            });
        }
        const userExists: Users = await Users.findOne({
            where: { user_name },
            attributes: { exclude: ["password"] }
        }) as Users;
        if (userExists) {
            res.status(400).json({
                error: HandleMessages.EXISTING_USERNAME
            });
            return;
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        await Users.create({
            dni,
            name,
            last_name,
            user_name,
            email,
            phone,
            password: hashedPassword,
            address,
            role_id,
            cooperative_id
        });

        res.status(201).json({
            msg: HandleMessages.USER_CREATED_SUCCESSFULLY
        });

    } catch (error) {
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};