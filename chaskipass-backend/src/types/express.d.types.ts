import {Request} from 'express';

interface UserRequest{
    dni:string;
    cooperative_id:string;
}

declare module 'express-serve-static-core'{
    interface Request{
        userReq?:UserRequest;
    }
}