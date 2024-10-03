
import { Request, Response } from 'express';
import { HandleMessages } from '../error/handleMessages.error';
import { Op } from 'sequelize';
import Buses from '../models/buses.models';

export const busRegister = async (req: Request, res: Response) => {
    // if(cooperative_id === undefined || dni === undefined){
    //     return res.status(401).json({
    //         error: HandleMessages.UNAUTHORIZED
    //     });
    // }
    try {
        const { cooperative_id, dni } = req.userReq ?? {};
        const { bus_number, license_plate, chassis_vin, bus_manufacturer, model, year, capacity, picture } = req.body;
        const id = `${license_plate.substring(0, 4)}-${year.slice(-2)}`;
        const busExists: Buses = await Buses.findOne({
            where: {
                [Op.or]: [
                    { id },
                    { license_plate }
                ]
            }
        }) as Buses;

        if (busExists) {
            res.status(400).json({
                error: HandleMessages.EXISTING_BUS
            });
        }

        await Buses.create({
            id,
            cooperative_id: cooperative_id || '',
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
            msg: HandleMessages.BUS_CREATED_SUCCESSFULLY
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};

export const getBuses = async (req: Request, res: Response) => {
    try {
        const { cooperative_id } = req.userReq ?? {};
        const busesList = await Buses.findAll({
            where: { cooperative_id }
        });
        res.status(201).json(busesList);
    } catch (error) {
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};

export const editBusById = async (req: Request, res: Response) => {
    try {
        const {cooperative_id, dni} = req.userReq ?? {};
        const { id } = req.params;
        const { bus_number, license_plate, chassis_vin, bus_manufacturer, model, year, capacity, picture } = req.body;
        const busExists: Buses = await Buses.findOne({
            where: {
                id,
                cooperative_id
            }
        }) as Buses;
        if(!busExists){
            res.status(400).json({
                error: HandleMessages.BUS_NOT_FOUND
            });
        }
        await Buses.update({
            bus_number,
            license_plate,
            chassis_vin,
            bus_manufacturer,
            model,
            year,
            capacity,
            picture
        }, {
            where: {
                id
            }
        });
        res.status(201).json({
            msg: HandleMessages.BUS_UPDATED_SUCCESSFULLY
        });
    } catch (error) {
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};

export const deleteBusById = async (req: Request, res: Response) => {
    try {
        const {cooperative_id, dni} = req.userReq ?? {};
        const { id } = req.params;
        const busExists: Buses = await Buses.findOne({
            where: {
                id,
                cooperative_id
            }
        }) as Buses;
        if(!busExists){
            res.status(400).json({
                error: HandleMessages.BUS_NOT_FOUND
            });
        };
        await Buses.destroy({
            where: {
                id
            }
        });
        res.status(201).json({
            msg: HandleMessages.BUS_DELETED_SUCCESSFULLY
        });
    } catch (error) {
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};
