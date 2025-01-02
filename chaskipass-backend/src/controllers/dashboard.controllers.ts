import { Request, Response } from "express";
import { getActiveFrequenciesAmountService, getClientsAmountService, getSoldTicketsAmountService, getTotalSalesService } from "../services/dashboard.services";
import { HandleMessages } from "../error/handleMessages.error";


export const getActiveFrequenciesAmount = async (req:Request, res:Response) => {
    try{
        const {cooperative_id} = req.userReq ?? {};
        const result = await getActiveFrequenciesAmountService(cooperative_id as string);
        res.status(result.status).json(result.json);
        return;
    }catch(error){
        console.error(error);
        res.status(500).json({msg:HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
};
export const getSoldTicketsAmount = async (req:Request, res:Response) => {
    try{
        const {cooperative_id} = req.userReq ?? {};
        const result = await getSoldTicketsAmountService(cooperative_id as string);
        res.status(result.status).json(result.json);
        return;
    }catch(error){
        console.error(error);
        res.status(500).json({msg:HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
};
export const getClientsAmount = async (req:Request, res:Response) => {
    try{
        const {cooperative_id} = req.userReq ?? {};
        const result = await getClientsAmountService(cooperative_id as string);
        res.status(result.status).json(result.json);
        return;
    }catch(error){
        console.error(error);
        res.status(500).json({msg:HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
};
export const getTotalSales = async (req:Request, res:Response) => {
    try{
        const {cooperative_id} = req.userReq ?? {};
        const result = await getTotalSalesService(cooperative_id as string);
        res.status(result.status).json(result.json);
        return;
    }catch(error){
        console.error(error);
        res.status(500).json({msg:HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
};