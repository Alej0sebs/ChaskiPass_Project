import { Op, where } from "sequelize";
import BusStations from "../models/busStations.models";
import { DataPaginationT, FilterFrequenciesT } from "../types/index.types";
import Routes from "../models/routes.models";
import Cities from "../models/cities.models";
import Frequencies from "../models/frequencies.models";
import { handleSequelizeError } from "../utils/helpers.utils";
import Cooperatives from "../models/cooperatives.models";

type filterConditionsT = {
    cooperative_id?: string;
    date?: Date;
    departure_time?: string;
    arrival_time?: string;
    price?: number;
    trip_type?: boolean;
}

export const filterFrequenciesService = async ({ cooperative_id, date, departure_time, arrival_time, price, trip_type, city_destination, city_origin}: FilterFrequenciesT, { page, limit, pattern }: DataPaginationT) => {
    const whereConditions: filterConditionsT = {};
    try {
        const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());
        //Construccion de filtros de la tabla propia
        if (cooperative_id) whereConditions.cooperative_id = cooperative_id;
        if (date) whereConditions.date = date;
        if (departure_time) whereConditions.departure_time = departure_time;
        if (arrival_time) whereConditions.arrival_time = arrival_time;
        if (price) whereConditions.price = price;
        if (trip_type) whereConditions.trip_type = trip_type;
        //Construccion de filtros de la tabla relacionada
        const includeConditions = [
            {
                model: Routes,
                include: [
                    {
                        model: BusStations,
                        as: 'departure_station_route',
                        include: [
                            {
                                model: Cities,
                                as: 'city_bus_station',
                                where: city_origin ? { name: { [Op.eq]: city_origin } } : undefined,  
                                attributes:['id','name'],
                                required: true
                            },
                        ],
                        attributes:['id','name'],
                        required: true

                    },
                    {
                        model: BusStations,
                        as: 'arrival_station_route',
                        include: [
                            {
                                model: Cities,
                                as: 'city_bus_station',
                                where: city_destination ? { name: { [Op.eq]: city_destination } } : undefined,
                                attributes:['id','name'],
                                required: true
                            }
                        ],
                        attributes:['id','name'],
                        required: true
                    }
                ]
            },
            {
                model: Cooperatives,
                as: 'cooperative_route',
                attributes:['name'],
                required: true
            }
        ];

        const { rows: frequencyList, count: totalItems } = await Frequencies.findAndCountAll({
            where: whereConditions,
            include: includeConditions,
            attributes:['date', 'departure_time', 'arrival_time', 'price'],
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
                list: frequencyList
            }
        };
    } catch (error) {
        return handleSequelizeError(error);
    }
};