import { Request, Response } from "express";
import { getCooperativeByIDService, getCoopertivesService, updateCooperativeService } from "../services/cooperatives.services";
import { HandleMessages } from "../error/handleMessages.error";
import path from "path";
import {uploadAndReplaceToHostinger, uploadToHostinger} from "../utils/uploadImagesFtp";
import { CooperativesT } from "../types/index.types";

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

export const updateCooperative = async (req:Request, res:Response) => {
    try{
        const {name, address, phone, email, logo, ticket_counter} = req.body;
    
        let remoteFileName = '';
        if(req.file){
            remoteFileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(req.file.originalname)}`;
            await uploadAndReplaceToHostinger(req.file.buffer, remoteFileName, logo);
        };
    
        const cooperativeData:CooperativesT = {
            id: req.userReq?.cooperative_id || '',
            name,
            address,
            phone,
            email,
            logo: remoteFileName ? remoteFileName : logo,
            ticket_counter
        };
        await updateCooperativeService(cooperativeData);
        res.status(200).json({msg:HandleMessages.COOPERATIVE_UPDATED});
        return;
    }catch(error){
        res.status(500).json({msg:HandleMessages.INTERNAL_SERVER_ERROR});
        return;
    }
};