import bcrypt from 'bcrypt';
import { Users } from '../models/users.models';
import { Admin } from '../models/administrators.models';
import Cooperatives from '../models/cooperatives.models';
import Roles from '../models/roles.models';
import { HandleMessages } from '../error/handleMessages.error';
import { CooperativesT, RolesT, SaasAdmin, UserT } from '../types/index.types';

// Servicio para crear un administrador SaaS
export const createSaasAdministratorService = async ({dni, user_name, email, password}:SaasAdmin) => {
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
};

// Servicio para crear un nuevo inquilino (tenant)
export const createNewTenantService = async (
    {dni,
    name,
    last_name,
    user_name,
    email,
    phone,
    password,
    address,
    role_id,
    cooperative_id}:UserT
) => {

    const userExists = await Users.findOne({
        where: { user_name },
        attributes: { exclude: ["password"] }
    }) as Users;

    if (userExists) {
        return { status: 400, json: { error: HandleMessages.EXISTING_USERNAME } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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
};

// Servicio para crear una cooperativa
export const createCooperativeService = async (
    {id,
    name,
    address,
    phone,
    email,
    description}:CooperativesT
) => {
    await Cooperatives.create({
        id,
        name,
        address,
        phone,
        email,
        description
    });

    return { status: 201, json: { msg: HandleMessages.COOPERATIVE_CREATED_SUCCESSFULLY } };
};

// Servicio para crear un rol
export const createRoleService = async ({id, name, description}:RolesT) => {
    await Roles.create({
        id,
        name,
        description
    });

    return { status: 201, json: { msg: HandleMessages.ROLE_CREATED_SUCCESSFULLY } };
};
