import { Request, Response } from 'express';
import { HandleMessages } from '../error/handleMessages.error';
import Routes from '../models/routes.models';
import { Users } from '../models/users.models';
import { RoleEnum } from '../utils/enums.utils';
import { validateRoleAndRouteId } from '../types/index.types';
import StopOvers from '../models/stopOvers.models';
import Frequencies from '../models/frequencies.models';


export const createRoute = async (req: Request, res: Response) => {
    try {
        //verifyRoute
        const { cooperative_id, dni } = req.userReq ?? {};
        const { departure_station_id, arrival_station_id, stopOverList } = req.body;
        const parameters: validateRoleAndRouteId = {
            dni: dni || '',
            cooperative_id: cooperative_id || '',
            departure_station_id,
            arrival_station_id
        }
        const id = await verifyRoute(parameters);

        const route: Routes = await Routes.create({
            id: "",//autoincrement
            cooperative_id: cooperative_id || '',
            departure_station_id,
            arrival_station_id
        });

        //check if stopOverList is not empty
        if (stopOverList && stopOverList.length > 0) {
            await Promise.all(stopOverList.map(async (stopOver: string, index: number) => {
                await StopOvers.create({
                    id,
                    route_id: route.id,
                    station_id: stopOver,
                    order: index + 1
                });
            }));
        };

        res.status(201).json({
            msg: HandleMessages.ROUTE_CREATED_SUCCESSFULLY,
            route: route.id
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

export const createFrequency = async (req: Request, res: Response) => {
    try {
        const { cooperative_id, dni } = req.userReq ?? {};
        const { id, bus_id, route_id, date, departure_time, arrival_time} = req.body;
        const routeExists: Routes = await Routes.findOne({
            where: {
                id: route_id
            }
        }) as Routes;
        if (!routeExists) {
            res.status(400).json({
                msg: HandleMessages.ROUTE_NOT_FOUND
            });
            return;
        };

        //Verificar si existe la ruta en la cooperativa
        const stopOversAmount:number= await StopOvers.count({
            where:{
                route_id
            }
        });
        const stopOverExists:boolean= stopOversAmount>0;
        await Frequencies.create({
            id,
            cooperative_id: cooperative_id || '',
            bus_id,
            route_id,
            date,
            departure_time,
            arrival_time,
            status: true, //true: active, false: inactive
            trip_type: stopOverExists ? true : false //true: stops, false: direct
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};

const verifyRoute = async ({ dni, cooperative_id, departure_station_id, arrival_station_id }: validateRoleAndRouteId) => {
    try {
        const userRole: Users = await Users.findOne({
            where: {
                dni,
                cooperative_id
            },
            attributes: ['role_id']
        }) as Users;
        if (!userRole || (userRole.role_id !== RoleEnum.administrator && userRole.role_id !== RoleEnum.clerk)) {
            throw new Error(HandleMessages.UNAUTHORIZED);
        };
        const date = new Date();
        const id = `${cooperative_id?.substring(0, 3)}${departure_station_id.substring(0, 5)}-${date.getHours()}${date.getMinutes()}-${arrival_station_id.substring(0, 5)}`;
        const routeExists: Routes = await Routes.findOne({
            where: {
                id
            }
        }) as Routes;
        if (routeExists) {
            throw new Error(HandleMessages.EXISTING_ROUTE);
        }

        return id;
    } catch (error) {
        console.log(error);
        throw new Error(HandleMessages.INTERNAL_SERVER_ERROR);
    }
};  