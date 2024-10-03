import { Request, Response } from 'express';
import { HandleMessages } from '../error/handleMessages.error';
import Routes from '../models/routes.models';
import { Users } from '../models/users.models';
import { RoleEnum } from '../utils/enums.utils';
import { validateRoleAndRouteId } from '../types/index.types';


export const createRoute = async (req: Request, res: Response) => {
    try {
        //verifyRoute
        const { cooperative_id, dni } = req.userReq ?? {};
        const { departure_station_id, arrival_station_id } = req.body;
        const parameters: validateRoleAndRouteId={
            dni : dni || '',
            cooperative_id: cooperative_id || '',
            departure_station_id,
            arrival_station_id
        }
        const id = await verifyRoute(parameters);

        await Routes.create({
            id,
            cooperative_id: cooperative_id || '',
            departure_station_id,
            arrival_station_id
        });

        res.status(201).json({
            msg: HandleMessages.ROUTE_CREATED_SUCCESSFULLY
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};

const verifyRoute = async ({dni, cooperative_id, departure_station_id, arrival_station_id}:validateRoleAndRouteId) => {
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
        //pk --date hour
        const id = `${cooperative_id?.substring(0, 3)} ${new Date().getFullYear()} ${departure_station_id.substring(0, 3)}`;
        
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