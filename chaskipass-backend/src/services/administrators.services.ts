import bcrypt from 'bcrypt';
import { Users } from '../models/users.models';
import { Admin } from '../models/administrators.models';
import Cooperatives from '../models/cooperatives.models';
import Roles from '../models/roles.models';
import { HandleMessages } from '../error/handleMessages.error';
import { CooperativesT, NewStationT, RolesT, SaasAdmin, UserT } from '../types/index.types';
import BusStations from '../models/busStations.models';
import { handleSequelizeError } from '../utils/helpers.utils';

// Servicio para crear un administrador SaaS
export const createSaasAdministratorService = async ({ dni, user_name, email, password }: SaasAdmin) => {
    try {


        const userExists = await Users.findOne({
            where: { user_name },
            attributes: { exclude: ["password"] }
        }) as Users;

        if (userExists) {
            return { status: 400, json: { error: HandleMessages.EXISTING_USERNAME } };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await Admin.create({
            dni,
            user_name,
            email,
            password: hashedPassword,
            role_id: 'superAdmin'
        });

        return { status: 201, json: { msg: HandleMessages.USER_CREATED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};


// Servicio para crear un nuevo inquilino (tenant)
export const createNewTenantService = async ({
    dni,
    name,
    last_name,
    user_name,
    email,
    phone,
    password,
    address,
    role_id,
    cooperative_id
}: UserT) => {
    try {
        // Verificar si el usuario ya existe
        const userExists = await Users.findOne({
            where: { user_name },
            attributes: { exclude: ["password"] }
        }) as Users;

        if (userExists) {
            return { status: 400, json: { error: HandleMessages.EXISTING_USERNAME } };
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        await Users.create({
            dni,
            name,
            last_name,
            user_name,
            email,
            phone,
            password: hashedPassword,
            address,
            role_id,
            cooperative_id
        });

        return { status: 201, json: { msg: HandleMessages.USER_CREATED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};

// Servicio para crear una cooperativa
export const createCooperativeService = async ({
    id,
    name,
    address,
    phone,
    email,
    logo
}: CooperativesT) => {
    try {
        // Intentar crear la cooperativa
        await Cooperatives.create({
            id,
            name,
            address,
            phone,
            email,
            logo,
            ticket_counter: 0
        });

        return { status: 201, json: { msg: HandleMessages.COOPERATIVE_CREATED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};

// Servicio para crear un rol
export const createRoleService = async ({ id, name, description }: RolesT) => {
    try {
        // Intentar crear el rol
        await Roles.create({
            id,
            name,
            description
        });

        return { status: 201, json: { msg: HandleMessages.ROLE_CREATED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};

//Ambato id 162
export const createNewStationService = async ({
    city_id,
    name,
    address,
    phone,
    open_time,
    close_time
}: NewStationT) => {
    try {
        // Verificar si la estación ya existe
        const stationExists = await BusStations.count({
            where: {
                city_id,
                name
            }
        });

        if (stationExists !== 0) {
            return { status: 400, json: { message: HandleMessages.STATION_ALREADY_EXISTS } };
        }

        // Crear la nueva estación
        await BusStations.create({
            id: 0, // Este valor probablemente deba ser manejado automáticamente por la base de datos
            city_id,
            name,
            address,
            phone,
            open_time,
            close_time
        });

        return { status: 201, json: { message: HandleMessages.STATION_CREATED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};