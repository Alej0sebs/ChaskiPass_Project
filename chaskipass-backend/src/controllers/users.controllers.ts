import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Users } from '../models/users.models';
import { ErrorMessages } from '../error/errorMessages.error';
import { Op } from 'sequelize';
import Buses from '../models/buses.models';

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
            msg: ErrorMessages.INTERNAL_SERVER_ERROR
        });
    }
};


export const createUserCooperative = async (req: Request, res: Response) => {
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


export const busRegister = async (req: Request, res: Response) => {
    const { cooperative_id:coop_id, dni } = req.userReq ?? {};
    if(coop_id === undefined || dni === undefined){
        return res.status(401).json({
            error: ErrorMessages.UNAUTHORIZED
        });
    }

    try{
        const {id, cooperative_id, bus_number, license_plate, chassis_vin, bus_manufacturer, model, year, capacity, picture} = req.body;
        const busExists:Buses = await Buses.findOne({
            where: {
                [Op.or]: [
                    { id },
                    { license_plate }
                ]
            }
        }) as Buses;

        if(busExists){
            res.status(400).json({
                error: ErrorMessages.EXISTING_BUS
            });
        }

        await Buses.create({
            id,
            cooperative_id: coop_id || "",
            bus_number,
            license_plate,
            chassis_vin,
            bus_manufacturer,
            model,
            year,
            capacity,
            picture
        });

        res.status(201).json({
            msg: ErrorMessages.BUS_CREATED_SUCCESSFULLY
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: ErrorMessages.INTERNAL_SERVER_ERROR
        });
    }
};