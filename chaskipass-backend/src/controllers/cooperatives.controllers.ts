import { Request, Response } from "express";
import { getCooperativeByIDService, getCoopertivesService } from "../services/cooperatives.services";
import { HandleMessages } from "../error/handleMessages.error";

export const getCooperativeByID = async (req:Request, res:Response) => {
    try{
        const {cooperative_id} = req.userReq ?? {};
        const result = await getCooperativeByIDService(cooperative_id as string);
        res.status(result.status).json(result.json);
        return;
    }catch(error){
        console.error(error);
        res.status(500).json({msg:HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
};

export const getCooperatives= async (req:Request, res:Response) => { 
    try{
        const result = await getCoopertivesService();
        res.status(result.status).json(result.json);
        return;
    }catch(error){
        console.error(error);
        res.status(500).json({msg:HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
};