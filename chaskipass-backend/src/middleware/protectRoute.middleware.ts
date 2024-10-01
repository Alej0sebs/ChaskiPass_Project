import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ErrorMessages } from '../error/errorMessages.error';
import { Users } from '../models/users.models';
import { UserT } from '../types/index.types';


const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //get token from headers
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                error: ErrorMessages.UNAUTHORIZED
            });
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded) {
            return res.status(401).json({
                error: ErrorMessages.INVALID_TOKEN
            });
        }

        if (typeof decoded === 'object' && 'dni' in decoded) {
            const userInformation: UserT = await Users.findByPk(decoded.dni, {
                attributes: { exclude: ['password'] }
            }) as UserT;
            if (!userInformation) {
                return res.status(404).json({
                    error: ErrorMessages.USER_NOT_FOUND
                });
            }
            //add user to req object
            req.userREq = userInformation;
            next();
        } else {
            res.status(500).json({
                error: ErrorMessages.INTERNAL_SERVER_ERROR
            });
        }

    } catch (error) {
        console.log("error in protectRoute middleware: ", error);
        res.status(500).json({
            error: ErrorMessages.INTERNAL_SERVER_ERROR
        });
    }

};

export default protectRoute;