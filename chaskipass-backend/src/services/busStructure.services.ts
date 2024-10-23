import { Op } from "sequelize";
import { HandleMessages } from "../error/handleMessages.error";
import BusStructure from "../models/busStructure.models";
import { BusStructureT } from "../types/index.types";
import { handleSequelizeError } from "../utils/helpers.utils";

export const getBusStructureService = async () => {
    try {
        const busStructures = await BusStructure.findAll();
        return { status: 200, json: busStructures };
    } catch (error) {
        // Usar la función genérica para manejar errores de Sequelize
        return handleSequelizeError(error);
    }
};

export const createBusStructureService = async ({ name, layout, cooperative_id }: BusStructureT) => {
    try {
        const busStructureExists = await BusStructure.findOne({
            where: {
                [Op.and]: [
                    { cooperative_id },
                    { name }
                ]
            }
        });

        if (busStructureExists) {
            return { status: 400, json: { msg: HandleMessages.BUS_STRUCTURE_ALREADY_EXISTS } };
        }

        await BusStructure.create({
            id: 0,
            name,
            layout: JSON.stringify(layout),
            cooperative_id
        });

        return { status: 200, json: { msg: HandleMessages.BUS_STRUCTURE_SUCCESSFULLY_CREATED } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};

