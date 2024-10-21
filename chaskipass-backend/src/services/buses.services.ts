import { Op } from 'sequelize';
import Buses from '../models/buses.models';
import { HandleMessages } from '../error/handleMessages.error';
import { BusT, DeleteBusT } from '../types/index.types';
import { createSeatService } from './seats.services';

// Servicio para registrar un bus
export const busRegisterService = async ({ cooperative_id, bus_number, license_plate, chassis_vin, bus_manufacturer, model, year, capacity, picture }: BusT) => {

    const busExists = await Buses.findOne({
        where: {
            [Op.or]: [{ license_plate }]
        }
    });

    if (busExists) {
        return { status: 400, json: { error: HandleMessages.EXISTING_BUS } };
    }

    await Buses.create({
        id: 0,
        cooperative_id,
        bus_number,
        license_plate,
        chassis_vin,
        bus_manufacturer,
        model,
        year,
        capacity,
        picture,
        bus_structure_id: 0
    });

    //Aqui va el metodo para agregar los asientos del bus
    const seatsService = await createSeatService({ layout: '', license_plate });
    if (seatsService.status !== 201) {
        await deleteBusByIdService({ id:0, license_plate, cooperative_id });
        return { status: 409, json: { error:`seatsService.json.error ${'No se pudo gestionar la creación de asientos para este bus'}` } };
    }
    

    return { status: 201, json: { msg: HandleMessages.BUS_CREATED_SUCCESSFULLY } };
};

// Servicio para obtener la lista de buses
export const getBusesService = async (cooperative_id: string) => {
    const busesList = await Buses.findAll({
        where: { cooperative_id }
    });

    return busesList;
};

// Servicio para editar un bus por ID
export const editBusByIdService = async ({ id, cooperative_id, bus_number, license_plate, chassis_vin, bus_manufacturer, model, year, capacity, picture, bus_structure_id }: BusT) => {
    const busExists = await Buses.findOne({
        where: {
            [Op.or]: [{
                id, license_plate
            }],
            cooperative_id
        }
    });

    if (!busExists) {
        return { status: 400, json: { error: HandleMessages.BUS_NOT_FOUND } };
    }

    await Buses.update(
        {
            bus_number,
            license_plate,
            chassis_vin,
            bus_manufacturer,
            model,
            year,
            capacity,
            picture,
            bus_structure_id
        },
        { where: { id } }
    );

    return { status: 201, json: { msg: HandleMessages.BUS_UPDATED_SUCCESSFULLY } };
};

// Servicio para eliminar un bus por ID
export const deleteBusByIdService = async ({ id, license_plate, cooperative_id }: DeleteBusT) => {
    const busExists = await Buses.findOne({
        where: {
            [Op.or]: [
                { id },
                { license_plate }
            ],
            cooperative_id
        }
    });

    if (!busExists) {
        return { status: 400, json: { error: HandleMessages.BUS_NOT_FOUND } };
    }

    await Buses.destroy({
        where: {
            id
        }
    });

    return { status: 201, json: { msg: HandleMessages.BUS_DELETED_SUCCESSFULLY } };
};




