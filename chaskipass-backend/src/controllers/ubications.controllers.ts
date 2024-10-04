import { Request, Response } from 'express';
import { HandleMessages } from '../error/handleMessages.error';
import Cities from '../models/cities.models';
import { Op } from 'sequelize';

export const getCities = async (req: Request, res: Response) => {
    try {
        //pagination
        const {page=1, limit=10} = req.query;
        const offset = page ? (parseInt(page.toString()) - 1) * (limit ? parseInt(limit.toString()) : 10) : 0;
        const {rows: citiesList, count:totalItems} = await Cities.findAndCountAll({
            limit: parseInt(limit.toString()),
            offset: offset // Skip records by page
        });

        const totalPages = Math.ceil(totalItems /  parseInt(limit.toString()));
        res.status(201).json({
            totalItems,
            totalPages,
            currentPage: parseInt(page.toString()),
            list:citiesList
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};

export const searchCitiesByFilter = async (req: Request, res: Response) => {
    try {
        //pagination
        const {page=1, limit=10, pattern} = req.query;
        const offset = page ? (parseInt(page.toString()) - 1) * (limit ? parseInt(limit.toString()) : 10) : 0;
        const {rows: citiesList, count:totalItems} = await Cities.findAndCountAll({
            where:{
                name: {
                    [Op.like]: `%${pattern}%`
                }
            },
            limit: parseInt(limit.toString()),
            offset: offset // Skip records by page
        });
        const totalPages = Math.ceil(totalItems /  parseInt(limit.toString()));
        res.status(201).json({
            totalItems,
            totalPages,
            currentPage: parseInt(page.toString()),
            list:citiesList
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};