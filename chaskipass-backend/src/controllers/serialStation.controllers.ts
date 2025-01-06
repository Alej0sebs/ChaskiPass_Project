import { Request, Response } from 'express';
import { createSellerSerialNumberService, getSerialNumberByStationAndDNIService, getSerialNumbersService } from '../services/serialStation.services';
import { SerialNumberT } from '../types/index.types';
import { getPaginationData } from '../utils/helpers.utils';
import { HandleMessages } from '../error/handleMessages.error';

export const creatSellerSerialNumber= async(req:Request, res:Response)=>{
    try{
        const { cooperative_id } = req.userReq ?? {};
        const {station_id, serial_number, user_id, status} = req.body;
        const values:SerialNumberT={
            id: 0,
            cooperative_id: cooperative_id || "",
            station_id,
            serial_number,
            user_id,
            status
        };
        const result = await createSellerSerialNumberService(values);
        if(result.status !== 201){
            res.status(result.status).json(result.json);
            return;
        };
        res.status(result.status).json(result.json);
        return;
    }catch(error){
        res.status(500).json({msg: HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
};

export const getSerialNumbers = async(req:Request, res:Response)=>{
    try{
        const {cooperative_id} = req.userReq ?? {};
        const paginationData = await getPaginationData(req.query);
        const result = await getSerialNumbersService(cooperative_id!,paginationData);
        res.status(201).json(result);
        return;
    }catch(error){
        res.status(500).json({msg: HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
};

export const getSerialNumberByStationAndDNI= async (req:Request, res:Response)=>{
    try{
        const {cooperative_id, dni} = req.userReq ?? {};
        const result = await getSerialNumberByStationAndDNIService(cooperative_id!, dni!);
        res.status(201).json(result);
        return;

    }catch(error){
        res.status(500).json({msg: HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
};