import { Routes } from '../models/routes.models';
import { Users } from '../models/users.models';
import StopOvers from '../models/stopOvers.models';
import Frequencies from '../models/frequencies.models';
import { HandleMessages } from '../error/handleMessages.error';
import { RoleEnum } from '../utils/enums.utils';
import { RoutesT, ValidateRoleAndRouteId } from '../types/index.types';

// Servicio para crear una nueva ruta
export const createRouteService = async ({dni,arrival_station_id,departure_station_id,cooperative_id,stopOverList}:RoutesT) => {
    const parameters: ValidateRoleAndRouteId = {
        dni: dni || '',
        cooperative_id: cooperative_id || '',
        departure_station_id,
        arrival_station_id
    };

    const id = await verifyRoute(parameters);

    const route: Routes = await Routes.create({
        id: '', // El ID es autoincrementable en la base de datos
        cooperative_id: cooperative_id || '',
        departure_station_id,
        arrival_station_id
    });

    // Si hay paradas intermedias, crear las paradas
    if (stopOverList && stopOverList.length > 0) {
        await Promise.all(stopOverList.map(async (stopOver: string, index: number) => {
            await StopOvers.create({
                id,
                route_id: route.id,
                station_id: stopOver,
                order: index + 1
            });
        }));
    }

    return { msg: HandleMessages.ROUTE_CREATED_SUCCESSFULLY, route: route.id };
};

// Servicio para crear una nueva frecuencia
export const createFrequencyService = async (cooperative_id: string, dni: string, id: string, bus_id: string, route_id: string, date: Date, departure_time: string, arrival_time: string) => {
    const routeExists = await Routes.findOne({ where: { id: route_id } });
    if (!routeExists) {
        return { status: 400, json: { msg: HandleMessages.ROUTE_NOT_FOUND } };
    }

    // Verificar si la ruta tiene paradas intermedias
    const stopOversAmount = await StopOvers.count({ where: { route_id } });
    const stopOverExists = stopOversAmount > 0;

    // Crear la frecuencia
    await Frequencies.create({
        id,
        cooperative_id: cooperative_id || '',
        bus_id,
        route_id,
        date,
        departure_time,
        arrival_time,
        status: true, // true: activo, false: inactivo
        trip_type: stopOverExists ? true : false // true: con paradas, false: directo
    });

    return { status: 201, json: { msg: HandleMessages.FREQUENCY_CREATED_SUCCESSFULLY  } };
};

// Función auxiliar para verificar la ruta y crear el ID único
const verifyRoute = async ({ dni, cooperative_id, departure_station_id, arrival_station_id }: ValidateRoleAndRouteId) => {
    const userRole = await Users.findOne({
        where: {
            dni,
            cooperative_id
        },
        attributes: ['role_id']
    }) as Users;

    if (!userRole || (userRole.role_id !== RoleEnum.administrator && userRole.role_id !== RoleEnum.clerk)) {
        throw new Error(HandleMessages.UNAUTHORIZED);
    }

    // Generar el ID único de la ruta basado en cooperative_id y estaciones
    const date = new Date();
    const id = `${cooperative_id?.substring(0, 3)}${departure_station_id.substring(0, 5)}-${date.getHours()}${date.getMinutes()}-${arrival_station_id.substring(0, 5)}`;

    const routeExists = await Routes.findOne({ where: { id } });
    if (routeExists) {
        throw new Error(HandleMessages.EXISTING_ROUTE);
    }

    return id;
};
