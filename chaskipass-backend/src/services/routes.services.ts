import { Routes } from '../models/routes.models';
import { Users } from '../models/users.models';
import StopOvers from '../models/stopOvers.models';
import { HandleMessages } from '../error/handleMessages.error';
import { RoleEnum } from '../utils/enums.utils';
import { DataPaginationT, RoutesT, ValidateRoleAndRouteId } from '../types/index.types';
import { handleSequelizeError } from '../utils/helpers.utils';
import { Op, Transaction } from 'sequelize';
import connectionDb from '../db/connection.db';


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


export const getRoutesService = async (cooperative_id: string, { page, limit, pattern }: DataPaginationT) => {
    try {
        const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

        // Asegúrate de esperar el resultado de la consulta de conteo
        const totalItems = await Routes.count({ where: { cooperative_id } });

        const query: string = `
            SELECT 
                r.id AS id,
                departureStation.name AS departure_station_name,
                departureCity.name AS departure_city_name,
                arrivalStation.name AS arrival_station_name,
                arrivalCity.name AS arrival_city_name,
                GROUP_CONCAT(stopStation.name ORDER BY stops.order SEPARATOR ', ') AS stop_station_names,
                GROUP_CONCAT(stopCity.name ORDER BY stops.order SEPARATOR ', ') AS stop_city_names
            FROM 
                routes AS r
            INNER JOIN 
                bus_stations AS departureStation ON r.departure_station_id = departureStation.id
            INNER JOIN 
                cities AS departureCity ON departureStation.city_id = departureCity.id
            INNER JOIN 
                bus_stations AS arrivalStation ON r.arrival_station_id = arrivalStation.id
            INNER JOIN 
                cities AS arrivalCity ON arrivalStation.city_id = arrivalCity.id
            LEFT JOIN 
                StopOvers AS stops ON r.id = stops.route_id
            LEFT JOIN 
                bus_stations AS stopStation ON stops.station_id = stopStation.id
            LEFT JOIN 
                cities AS stopCity ON stopStation.city_id = stopCity.id
            WHERE 
                r.cooperative_id = :cooperative_id
            GROUP BY 
                r.id, departure_station_name, departure_city_name, arrival_station_name, arrival_city_name
            LIMIT :limit OFFSET :offset;
        `;

        const [listRoutes] = await connectionDb.query(query, {
            replacements: { cooperative_id, limit: parseInt(limit.toString()), offset },
        });

        const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

        return {
            status: 200,
            json: {
                totalItems,
                totalPages,
                listRoutes
            }
        };

    } catch (error) {
        return handleSequelizeError(error);
    }
};

