import { Routes } from '../models/routes.models';
import { Users } from '../models/users.models';
import StopOvers from '../models/stopOvers.models';
import Frequencies from '../models/frequencies.models';
import { HandleMessages } from '../error/handleMessages.error';
import { RoleEnum } from '../utils/enums.utils';
import { FrequencyT, RoutesT, ValidateRoleAndRouteId } from '../types/index.types';
import { handleSequelizeError } from '../utils/helpers.utils';
import { v4 as uuidv4 } from 'uuid';
import connectionDb from '../db/connection.db';
import { Op, Transaction } from 'sequelize';


// Servicio para crear una nueva ruta
export const createRouteService = async ({ dni, arrival_station_id, departure_station_id, cooperative_id, stopOverList }: RoutesT) => {
    try {

        let routeExists;
        if (stopOverList && stopOverList.length > 0) {
            routeExists = await Routes.findOne({
                include: [{
                    model: StopOvers,
                    attributes: ["station_id"],
                    where: {
                        station_id: {
                            [Op.in]: stopOverList!.map(stop => parseInt(stop as string)) // Asegúrate de convertir a número si es necesario
                        }
                    }
                }],
                where: {
                    [Op.and]: [
                        { departure_station_id },
                        { arrival_station_id },
                        { cooperative_id } // Asegúrate de que cooperative_id sea parte del where
                    ]
                },
            });
        } else {
            routeExists = await Routes.findOne({
                where: {
                    [Op.and]: [
                        { departure_station_id },
                        { arrival_station_id },
                        { cooperative_id } // Asegúrate de que cooperative_id sea parte del where
                    ]
                }
            })
        }

        if (routeExists) {
            return { status: 400, json: { error: HandleMessages.EXISTING_ROUTE } };
        }

        const parameters: ValidateRoleAndRouteId = {
            dni: dni || '',
            cooperative_id: cooperative_id || '',
            departure_station_id,
            arrival_station_id
        };

        const id = await verifyRoute(parameters,);

        const route: Routes = await Routes.create({
            id: id as string,
            cooperative_id: cooperative_id || '',
            departure_station_id,
            arrival_station_id
        });

        // Si hay paradas intermedias, crear las paradas
        if (stopOverList && stopOverList.length > 0) {
            await Promise.all(stopOverList.map(async (stopOver, index: number) => {
                await StopOvers.create({
                    id: 0,
                    route_id: route.id,
                    station_id: parseInt(stopOver as string),
                    order: index + 1
                });
            }));
        }
        return { status: 201, json: { msg: HandleMessages.ROUTE_CREATED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};


// Servicio para crear una nueva frecuencia
export const createFrequencyService = async ({ cooperative_id, bus_id, route_id, date, departure_time, arrival_time, price, status }: FrequencyT) => {
    try {
        const routeExists = await Routes.findOne({ where: { id: route_id } });
        if (!routeExists) {
            return { status: 400, json: { msg: HandleMessages.ROUTE_NOT_FOUND } };
        }

        // Verificar si la ruta tiene paradas intermedias
        const stopOversAmount = await StopOvers.count({ where: { route_id } });
        const stopOverExists = stopOversAmount > 0;

        //verificar si la ruta ya existe 
        const frequencyExists = await Frequencies.findOne({ where: { route_id, date, departure_time, arrival_time } });
        if (frequencyExists) return { status: 400, json: { msg: HandleMessages.FREQUENCY_ALREADY_EXISTS } };

        const id = uuidv4();
        // Crear la frecuencia
        await Frequencies.create({
            id,
            cooperative_id: cooperative_id || '',
            bus_id,
            route_id,
            date,
            departure_time,
            arrival_time,
            status, // true: activo, false: inactivo
            trip_type: stopOverExists ? true : false, // true: con paradas, false: directo
            price
        });

        return { status: 201, json: { msg: HandleMessages.FREQUENCY_CREATED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};



// Función auxiliar para verificar la ruta y crear el ID único
export const verifyRoute = async ({ dni, cooperative_id, departure_station_id, arrival_station_id }: ValidateRoleAndRouteId, transaction?: Transaction) => {
    try {
        const userRole = await Users.findOne({
            where: {
                dni,
                cooperative_id
            },
            attributes: ['role_id'],
            // transaction
        }) as Users;

        if (!userRole || (userRole.role_id !== RoleEnum.administrator && userRole.role_id !== RoleEnum.clerk)) {
            throw new Error(HandleMessages.UNAUTHORIZED);
        }

        // Generar el ID único de la ruta basado en cooperative_id y estaciones
        const date = new Date();
        const id = `${cooperative_id?.substring(0, 3)}${departure_station_id}-${date.getHours()}${date.getMinutes()}-${arrival_station_id}`;

        return id;
    } catch (error) {
        return handleSequelizeError(error);
    }
};

export const getRoutesService = async (cooperative_id: string) => {
    try {
        const routes = await Routes.findAll({
            include: [
                {
                    model: StopOvers,
                    attributes: ['id'],
                }
            ],
            where: { cooperative_id }
        });
        return { status: 200, json: routes };
    } catch (error) {
        return handleSequelizeError(error);
    }
};


