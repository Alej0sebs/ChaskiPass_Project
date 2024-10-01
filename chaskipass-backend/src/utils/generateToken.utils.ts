import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { UserT } from '../types/index.types';

const generateTokenAndSetCookie =(dni:string, res:Response)=>{
    const token = jwt.sign({dni}, process.env.JWT_SECRET as string, {expiresIn: '5d'});
    res.cookie('jwt', token, {
        maxAge: 5*24*60*60*1000,
        httpOnly: true, //prevent XSS attacks
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks,
        secure: process.env.NODE_ENV === 'development' //cookie only works in https
    });
};

export default generateTokenAndSetCookie;