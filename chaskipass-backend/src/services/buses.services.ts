import { Op, Transaction } from 'sequelize';
import Buses from '../models/buses.models';
import { HandleMessages } from '../error/handleMessages.error';
import { BusT, DeleteBusT } from '../types/index.types';
import { createSeatService } from './seats.services';
import BusStructure from '../models/busStructure.models';
import connectionDb from '../db/connection.db';
import { handleSequelizeError } from '../utils/helpers.utils';

// Servicio para registrar un bus
export const busRegisterService = async (busData: BusT) => {
    try {
        await connectionDb.transaction(async (transaction) => {
            const {
                cooperative_id,
                bus_number,
                license_plate,
                chassis_vin,
                bus_manufacturer,
                model,
                year,
                capacity,
                picture,
                bus_structure_id,
            } = busData;

            // Verificar si el bus ya existe
            const busExists = await Buses.findOne({
                where: {
                    [Op.or]: [{ license_plate }],
                },
                transaction, // Incluir la transacción
            });

            if (busExists) {
                throw new Error(HandleMessages.EXISTING_BUS);
            }

            // Crear el bus
            const newBus = await Buses.create(
                {
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
                    bus_structure_id,
                },
                { transaction } // Incluir la transacción
            );

            // Obtener el layout del bus
            const findLayout = await BusStructure.findOne({
                where: { id: bus_structure_id },
                attributes: ['layout'],
                transaction, // Incluir la transacción
            });

            if (!findLayout) {
                throw new Error(
                    `Servicio de asientos error: No se pudo gestionar la creación de asientos para este bus`
                );
            }

            const layout: string = findLayout.layout;

            // Crear los asientos del bus
            const seatsService = await createSeatService(
                { layout, license_plate },
                transaction // Pasar la transacción
            );

            if (seatsService.status !== 201) {
                throw new Error(
                    `Servicio de asientos error: No se pudo gestionar la creación de asientos para este bus`
                );
            }
        });

        // Si todo sale bien, devolver éxito
        return {
            status: 201,
            json: { msg: HandleMessages.BUS_CREATED_SUCCESSFULLY },
        };
    } catch (error) {
        // Manejar los errores
        return handleSequelizeError(error);
    }
};


// Servicio para obtener la lista de buses
export const getBusesService = async (cooperative_id: string) => {
    try {
        const busesList = await Buses.findAll({
            where: { cooperative_id }
        });

        return { status: 200, json: busesList };

    } catch (error) {
        return handleSequelizeError(error);
    }
};

// Servicio para editar un bus por ID
export const editBusByIdService = async ({ id, cooperative_id, bus_number, license_plate, chassis_vin, bus_manufacturer, model, year, capacity, picture, bus_structure_id }: BusT) => {
    try {
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
    } catch (error) {
        return handleSequelizeError(error);
    }
};

// Servicio para eliminar un bus por ID
export const deleteBusByIdService = async ({ id, license_plate, cooperative_id }: DeleteBusT, transaction: Transaction) => {
    try {
        const busExists = await Buses.findOne({
            where: {
                [Op.or]: [
                    { id },
                    { license_plate }
                ],
                cooperative_id
            },
            transaction
        });

        if (!busExists) {
            return { status: 400, json: { error: HandleMessages.BUS_NOT_FOUND } };
        }

        await Buses.destroy({
            where: {
                [Op.or]: [
                    { id },
                    { license_plate }
                ],
                cooperative_id
            }
        });

        return { status: 201, json: { msg: HandleMessages.BUS_DELETED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};




