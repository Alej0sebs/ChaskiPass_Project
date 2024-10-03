import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { HandleMessages } from '../error/handleMessages.error';
import { Users } from '../models/users.models';
import { UserT } from '../types/index.types';


const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({
                error: HandleMessages.UNAUTHORIZED
            });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded) {
            res.status(401).json({
                error: HandleMessages.INVALID_TOKEN
            });
            return;
        }

        if (typeof decoded === 'object' && 'dni' in decoded) {
            const userInformation: UserT = await Users.findByPk(decoded.dni, {
                attributes: { exclude: ['password'] }
            }) as UserT;

            if (!userInformation) {
                res.status(404).json({
                    error: HandleMessages.USER_NOT_FOUND
                });
                return;
            }
            req.userReq = {
                dni: userInformation.dni,
                cooperative_id: userInformation.cooperative_id
            };
            next();
        } else {
            res.status(500).json({
                error: HandleMessages.INTERNAL_SERVER_ERROR
            });
        }

    } catch (error) {
        console.log("Error en el middleware protectRoute: ", error);
        res.status(500).json({
            error: HandleMessages.INTERNAL_SERVER_ERROR
        });
    }
};

export default protectRoute;