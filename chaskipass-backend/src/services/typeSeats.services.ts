import { v4 as uuidv4 } from 'uuid';
import { CreateTypeSeatT, TypeSeatT } from '../types/index.types';
import TypeSeats from '../models/typeSeats.models';
import { HandleMessages } from '../error/handleMessages.error';
import { Transaction } from 'sequelize'; // Importar el tipo Transaction de sequelize
import { handleSequelizeError } from '../utils/helpers.utils';

export const createTypeSeatService = async ({ cooperative_id, name, description, additional_cost, special_caracter }: CreateTypeSeatT) => {
    try {
        const id = uuidv4();

        const typeSeatExist = await TypeSeats.count({
            where: { id }
        });

        if (typeSeatExist !== 0) {
            return { status: 400, json: { error: HandleMessages.EXISTING_TYPE_SEAT } };
        }

        await TypeSeats.create({
            id,
            cooperative_id,
            name,
            description,
            additional_cost,
            special_caracter
        });

        return { status: 201, json: { msg: HandleMessages.TYPE_SEAT_CREATED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};


//No requiero de paginacion
export const getTypeSeatsService = async (cooperative_id: string, transaction?: Transaction) => {
    try {
        const typeSeatsList = await TypeSeats.findAll({
            where: { cooperative_id },
            transaction
        });

        return { status: 200, json: typeSeatsList };
    } catch (error) {
        return handleSequelizeError(error);
    }
};
