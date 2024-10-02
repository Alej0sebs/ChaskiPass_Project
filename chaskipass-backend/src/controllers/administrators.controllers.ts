import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Users } from '../models/users.models';
import { ErrorMessages } from '../error/errorMessages.error';
import Cooperatives from '../models/cooperatives.models';
import { Admin } from '../models/administrators.models';

export const createSaasAdministrator = async (req: Request, res: Response) => {
    try {
        const { dni, user_name, email,  password } = req.body;
        const userExists: Users = await Users.findOne({
            where: { user_name },
            attributes: { exclude: ["password"] }
        }) as Users;
        if (userExists) {
            res.status(400).json({
                error: ErrorMessages.EXISTING_USERNAME
            });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        await Admin.create({
            dni,
            user_name,
            email,
            password: hashedPassword,
            role_id: 'superAdmin'
        });

        res.status(201).json({
            msg: ErrorMessages.USER_CREATED_SUCCESSFULLY
        });

    } catch (error) {
        res.status(500).json({
            msg: ErrorMessages.INTERNAL_SERVER_ERROR
        });
    }
};

export const createNewTenant = async (req: Request, res: Response) => {
    try {
        const { dni, name, last_name, user_name, email, phone, password, confirmPassword, address, role_id, cooperative_id } = req.body;
        if (password !== confirmPassword) {
            res.status(400).json({
                error: ErrorMessages.COMPARE_PASSWORD
            });
        }
        const userExists: Users = await Users.findOne({
            where: { user_name },
            attributes: { exclude: ["password"] }
        }) as Users;
        if (userExists) {
            res.status(400).json({
                error: ErrorMessages.EXISTING_USERNAME
            });
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
            msg: ErrorMessages.USER_CREATED_SUCCESSFULLY
        });

    } catch (error) {
        res.status(500).json({
            msg: ErrorMessages.INTERNAL_SERVER_ERROR
        });
    }
};

export const createCooperative = async (req: Request, res: Response) => {
    try {
        const { id ,name, address, phone, email, description} = req.body;
        await Cooperatives.create({
            id,
            name,
            address,
            phone,
            email,
            description
        });
        res.status(201).json({
            msg: ErrorMessages.COOPERATIVE_CREATED_SUCCESSFULLY
        });
    } catch (error) {
        res.status(500).json({
            msg: ErrorMessages.INTERNAL_SERVER_ERROR
        });
    }
};