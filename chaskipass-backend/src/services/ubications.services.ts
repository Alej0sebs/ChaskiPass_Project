import { Op } from 'sequelize';
import Cities from '../models/cities.models';
import { DataPaginationT } from '../types/index.types';

// Servicio para obtener las ciudades con paginación
export const getCitiesService = async ({page, limit}: DataPaginationT) => {
    const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

    const { rows: citiesList, count: totalItems } = await Cities.findAndCountAll({
        limit: parseInt(limit.toString()),
        offset: offset
    });

    const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

    return {
        totalItems,
        totalPages,
        currentPage: parseInt(page.toString()),
        list: citiesList
    };
};

// Servicio para buscar ciudades por filtro
export const searchCitiesByFilterService = async ({page, limit, pattern}: DataPaginationT) => {
    const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

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
        totalItems,
        totalPages,
        currentPage: parseInt(page.toString()),
        list: citiesList
    };
};
