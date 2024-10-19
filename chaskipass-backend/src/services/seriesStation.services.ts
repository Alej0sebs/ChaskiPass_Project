import { HandleMessages } from "../error/handleMessages.error";
import BusStations from "../models/busStations.models";
import { SerialStation } from "../models/serialStation.model";
import { Users } from "../models/users.models";
import { DataPaginationT, SerialNumberT } from "../types/index.types";

export const createSellerSerialNumberService= async({cooperative_id, station_id, serial_number, user_id, status}:SerialNumberT) => {
    const serialNumberExist = await SerialStation.count({
        where:{serial_number}
    });

    if(serialNumberExist != 0) return { status: 400, json: { error: HandleMessages.EXISTING_SERIAL_NUMBER } };

    await SerialStation.create({
        id: 0,
        cooperative_id,
        user_id,
        serial_number,
        station_id,
        status,
    })
    return { status: 201, json: { msg: HandleMessages.SERIAL_NUMBER_CREATED_SUCCESSFULLY}}; 
}


export const getSerialNumbers = async ({page, limit}: DataPaginationT) => {
    const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

    const { rows: serialList, count: totalItems } = await SerialStation.findAndCountAll({
        attributes:['serial_number'],
        include:[{
            model: BusStations,
            attributes: ['id', 'name'],
            required:true
        },{
            model:Users,
            attributes:['dni', 'name', 'last_name'],
            required:true
        }],
        limit: parseInt(limit.toString()),
        offset: offset
    });

    const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

    return {
        totalItems,
        totalPages,
        currentPage: parseInt(page.toString()),
        list: serialList
    };
};
