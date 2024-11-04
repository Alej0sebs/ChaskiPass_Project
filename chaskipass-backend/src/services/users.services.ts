import bcrypt from 'bcrypt';
import { Users } from '../models/users.models';
import { HandleMessages } from '../error/handleMessages.error';
import { Op } from 'sequelize';
import { DataPaginationT, UpdateUserT, UserT } from '../types/index.types';
import { handleSequelizeError } from '../utils/helpers.utils';


// Servicio para obtener usuarios con paginación
export const getUsersService = async (cooperative_id: string, dni: string, { page, limit }: DataPaginationT) => {
    try {
        const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

        const { rows: usersList, count: totalItems } = await Users.findAndCountAll({
            where: {
                cooperative_id,
                dni: { [Op.ne]: dni }
            },
            attributes: { exclude: ['password'] },
            limit: parseInt(limit.toString()),
            offset: offset
        });

        const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

        return {
            status: 200,
            json: {
                totalItems,
                totalPages,
                currentPage: parseInt(page.toString()),
                list: usersList
            }
        };
    } catch (error) {
        return handleSequelizeError(error);
    }
};


export const getUserByIdService = async (dni: string) => {
    try {
        const user = await Users.findOne({
            where: {
                dni
            },
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return { status: 404, json: { error: HandleMessages.USER_NOT_FOUND } };
        }

        return { status: 200, json: user };
    } catch (error) {
        return handleSequelizeError(error);
    }
};


// Servicio para buscar usuarios con filtro
export const searchUserByFilterService = async (cooperative_id: string, dni: string, { pattern, page, limit }: DataPaginationT) => {
    try {
        const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

        const { rows: filteredList, count: totalItems } = await Users.findAndCountAll({
            where: {
                cooperative_id,
                [Op.or]: [
                    { dni: { [Op.like]: `%${pattern}%` } },
                    { name: { [Op.like]: `%${pattern}%` } },
                    { last_name: { [Op.like]: `%${pattern}%` } }
                ],
                dni: { [Op.ne]: dni }
            },
            attributes: { exclude: ['password'] },
            limit: parseInt(limit.toString()),
            offset: offset
        });

        const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

        return {
            status: 200,
            json: {
                totalItems,
                totalPages,
                currentPage: parseInt(page.toString()),
                list: filteredList
            }
        };
    } catch (error) {
        return handleSequelizeError(error);
    }
};

// Lógica para crear usuario
export const createUserService = async (userData: UserT) => {
    try {
        const { dni, name, last_name, user_name, email, phone, password, address, role_id, cooperative_id } = userData;

        // Verificar si el usuario ya existe
        const userExists = await Users.findOne({
            where: { user_name },
            attributes: { exclude: ["password"] }
        });

        if (userExists) {
            return { status: 400, json: { error: HandleMessages.EXISTING_USERNAME } };
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
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


export const updateUserService = async (userData: UpdateUserT) => {
    try {
        const { dni, name, last_name, user_name, phone, address, password } = userData;

        // Verificar si el usuario ya existe
        const userExists = await Users.findOne({
            where: { dni },
            attributes: { exclude: ["password"] }
        });

        if (!userExists) {
            return { status: 404, json: { error: HandleMessages.USER_NOT_FOUND } };
        }

        // Hashear la contraseña si está presente
        const updatedPassword = password ? await bcrypt.hash(password, 10) : userExists.password;

        // Actualizar usuario
        await Users.update(
            {
                name,
                last_name,
                user_name,
                phone,
                address,
                password: updatedPassword
            },
            {
                where: { dni }
            }
        );

        return { status: 200, json: { msg: HandleMessages.USER_UPDATED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};


export const getDriversService = async (cooperative_id:string) => {
    try{
        const drivers = await Users.findAll({
            where: { cooperative_id, role_id: 'drive' },
            attributes: ['dni', 'name', 'last_name']
        });

        return { status: 200, json: drivers };
    }catch(error){
        return handleSequelizeError(error);
    }
};
