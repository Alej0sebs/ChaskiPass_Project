import { Sequelize } from "sequelize";
import { HandleMessages } from "../error/handleMessages.error";
import BusStations from "../models/busStations.models";
import { StationCooperative } from "../models/stationCooperative.models";
import { DataPaginationT, StationCooperativeT } from "../types/index.types";

export const linkCooperativeStationService = async ({ cooperative_id, station_id }: StationCooperativeT) => {
    const busStationExist = await BusStations.count({
        where: { id: station_id }
    });

    if (busStationExist == 0) return { status: 400, json: { message: `Existe un problema con la estacion. ${HandleMessages.STATION_NOT_FOUND}` } }

    const cooperativeStationExist = await StationCooperative.count({
        where: { cooperative_id, station_id }
    });

    if (cooperativeStationExist) return { status: 400, json: { message: HandleMessages.COOP_STATION_EXIST } };

    await StationCooperative.create({
        id: 0,
        cooperative_id,
        station_id
    });

    return { status: 201, json: { message: HandleMessages.COOP_LINK_SUCCESFULLY } };
};

export const getStationCooperativeService = async (cooperative_id: string, { page, limit }: DataPaginationT) => {
    const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());
    const {rows:linkedCooperativesList, count:totalItems}= await BusStations.findAndCountAll({
        attributes: ['id', 'name'],
        include: [{
            model: StationCooperative,
            attributes: [],
            where: { cooperative_id },
            required: true
        }],
        limit: parseInt(limit.toString()),
        offset
    });

    const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

    return {
        totalItems,
        totalPages,
        currentPage: parseInt(page.toString()),
        list: linkedCooperativesList
    };
};
