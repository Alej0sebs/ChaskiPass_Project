import { Op } from 'sequelize';
import Cities from '../models/cities.models';
import { DataPaginationT } from '../types/index.types';
import BusStations from '../models/busStations.models';
import { handleSequelizeError } from '../utils/helpers.utils';

// Servicio para obtener las ciudades con paginación
export const getCitiesService = async ({ page, limit }: DataPaginationT) => {
    try {
        const pageIndex = Math.max(1, parseInt(page.toString())); // Asegura que page sea al menos 1
        const offset = (pageIndex - 1) * parseInt(limit.toString());

        const { rows: citiesList, count: totalItems } = await Cities.findAndCountAll({
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
                list: citiesList
            }
        };
    } catch (error) {
        return handleSequelizeError(error);
    }
};



// Servicio para buscar ciudades por filtro
export const searchCitiesByFilterService = async ({ page, limit, pattern }: DataPaginationT) => {
    try {
        const pageIndex = Math.max(1, parseInt(page.toString())); // Asegura que page sea al menos 1
        const offset = (pageIndex - 1) * parseInt(limit.toString());

        const { rows: citiesList, count: totalItems } = await Cities.findAndCountAll({
            where: {
                name: {
                    [Op.like]: `%${pattern}%`
                }
            },
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
                list: citiesList
            }
        };
    } catch (error) {
        return handleSequelizeError(error);
    }
};


export const getBusStationService = async () => { 
    try {
        const busStation = await BusStations.findAll({
            attributes: ['id', 'name'],
            include: [{
                model: Cities,
                as: 'city_bus_station',
                attributes: ['id', 'name'],
                required: true
            }]
        });

        return { status: 200, json: busStation };
    } catch (error) {
        return handleSequelizeError(error);
    }
};
