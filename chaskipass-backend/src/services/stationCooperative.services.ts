import { HandleMessages } from "../error/handleMessages.error";
import BusStations from "../models/busStations.models";
import Cities from "../models/cities.models";
import { StationCooperative } from "../models/stationCooperative.models";
import { DataPaginationT, StationCooperativeT } from "../types/index.types";
import { handleSequelizeError } from "../utils/helpers.utils";

export const linkCooperativeStationService = async ({ cooperative_id, station_id }: StationCooperativeT) => {
    try {
        const busStationExist = await BusStations.count({
            where: { id: station_id }
        });

        if (busStationExist === 0) {
            return { status: 400, json: { message: `Existe un problema con la estación. ${HandleMessages.STATION_NOT_FOUND}` } };
        }

        const cooperativeStationExist = await StationCooperative.count({
            where: { cooperative_id, station_id }
        });

        if (cooperativeStationExist) {
            return { status: 400, json: { message: HandleMessages.COOP_STATION_EXIST } };
        }

        await StationCooperative.create({
            id: 0,
            cooperative_id,
            station_id
        });

        return { status: 201, json: { message: HandleMessages.COOP_LINK_SUCCESFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};


export const getStationCooperativeService = async (cooperative_id: string, { page, limit }: DataPaginationT) => {
    try {
        const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());
        const { rows: linkedCooperativesList, count: totalItems } = await BusStations.findAndCountAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: StationCooperative,
                    attributes: [],
                    where: { cooperative_id },
                    required: true
                },
                {
                    model:Cities,
                    as:'city_bus_station',
                    attributes:['id','name'],
                    required:true
                }
            ],
            limit: parseInt(limit.toString()),
            offset
        });

        const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

        return {
            status: 200,
            json: {
                totalItems,
                totalPages,
                currentPage: parseInt(page.toString()),
                list: linkedCooperativesList
            }
        };
    } catch (error) {
        return handleSequelizeError(error);
    }
};

