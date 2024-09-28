import {Request, Response} from 'express';

const getUsers = (req:Request, res:Response) =>{
    res.json({
        msg: 'getUsers'
    })
}

export{
    getUsers
}