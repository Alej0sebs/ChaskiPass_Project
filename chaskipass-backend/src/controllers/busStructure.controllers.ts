import { Request, Response } from "express";
import { HandleMessages } from "../error/handleMessages.error";
import { createBusStructureService, getBusStructureService } from "../services/busStructure.services";

export const createBusStructure=async(req:Request, res:Response)=>{
    try{
        const {name, layout, cooperative_id} = req.body;
        const result = await createBusStructureService({id:0,name, layout, cooperative_id});
        res.status(result.status).json(result.json);
        return;
    }catch(error){
        res.status(500).json({msg:HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
}

export const getBusStructure= async (req:Request, res:Response) => {
    try{
        const {cooperative_id} = req.userReq ?? {};
        const result = await getBusStructureService(cooperative_id!);
        res.status(result.status).json(result.json);
        return;
    }catch(error){
        res.status(500).json({msg:HandleMessages.INTERNAL_SERVER_ERROR});
        return
    }
};

