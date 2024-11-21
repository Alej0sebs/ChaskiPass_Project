import { Op } from "sequelize";
import { HandleMessages } from "../error/handleMessages.error";
import BusStations from "../models/busStations.models";
import { SerialStation } from "../models/serialStation.model";
import { Users } from "../models/users.models";
import { DataPaginationT, SerialNumberT } from "../types/index.types";
import { handleSequelizeError } from "../utils/helpers.utils";
import Cooperatives from "../models/cooperatives.models";

export const createSellerSerialNumberService = async ({ cooperative_id, station_id, serial_number, user_id, status }: SerialNumberT) => {
    try {
        const serialNumberExist = await SerialStation.count({
            where: { serial_number }
        });

        if (serialNumberExist !== 0) {
            return { status: 400, json: { error: HandleMessages.EXISTING_SERIAL_NUMBER } };
        }

        await SerialStation.create({
            id: 0,
            cooperative_id,
            user_id,
            serial_number,
            station_id,
            status,
        });

        return { status: 201, json: { msg: HandleMessages.SERIAL_NUMBER_CREATED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};



export const getSerialNumbersService = async ({ page, limit }: DataPaginationT) => {
    try {
        const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

        const { rows: serialList, count: totalItems } = await SerialStation.findAndCountAll({
            attributes: ['serial_number'],
            include: [
                {
                    model: BusStations,
                    attributes: ['id', 'name'],
                    required: true
                },
                {
                    model: Users,
                    attributes: ['dni', 'name', 'last_name'],
                    required: true
                }
            ],
            limit: parseInt(limit.toString()),
            offset: offset
        });

        const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

        return {
            status: 200,
            json: {
                totalItems,
                totalPages,
                currentPage: parseInt(page.toString()),
                list: serialList
            }
        };
    } catch (error) {
        return handleSequelizeError(error);
    }
};

export const getSerialNumberByStationAndDNIService = async (cooperative_id: string, dni: string) => {
    try {
        const serialNumber = await SerialStation.findOne({
            where: {
                [Op.and]: [{ cooperative_id }, { user_id: dni }],
            },
            attributes: ['serial_number']
        });

        const actualTicket = await Cooperatives.findOne({
            where: { id: cooperative_id },
            attributes: ['ticket_counter']
        });

        return { status: 200, json: { serialNumber: serialNumber?.serial_number, actualTicket: actualTicket?.ticket_counter } };
    }catch(error){
        return handleSequelizeError(error);
    }
}

