import { HandleMessages } from "../error/handleMessages.error";
import BusStructure from "../models/busStructure.models";
import { BusStructureT } from "../types/index.types";

export const getBusStructureService = async () => {
    return await BusStructure.findAll();
};

export const createBusStructureService = async ({name, layout, cooperative_id}:BusStructureT) => {
    await BusStructure.create({
        id: 0,
        name,
        layout: JSON.stringify(layout),
        cooperative_id
    });

    return {status:200 ,json:{msg: HandleMessages.BUS_STRUCTURE_SUCCESSFULLY_CREATED}};
};

