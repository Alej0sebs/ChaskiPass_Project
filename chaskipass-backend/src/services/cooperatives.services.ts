import { where } from "sequelize";
import { HandleMessages } from "../error/handleMessages.error";
import Cooperatives from "../models/cooperatives.models";
import { CooperativesT } from "../types/index.types";
import { handleSequelizeError } from "../utils/helpers.utils";

export const getCooperativeByIDService = async (cooperativeID:string) =>{
    try{
        const cooperative = await Cooperatives.findOne({where:{id:cooperativeID}});
        if(!cooperative){
            return {status:404,json:{error:HandleMessages.COOPERATIVE_NOT_FOUND}};
        }
        return {status:200,json:{cooperative}};

    }catch(error){
        return handleSequelizeError(error);
    }
};

export const getCoopertivesService = async () =>{
    try{
        const cooperatives = await Cooperatives.findAll();
        return {status:200,json:{cooperatives}};
    }catch(error){
        return handleSequelizeError(error);
    }
};

export const updateCooperativeService= async (busData:CooperativesT) =>{
    try{
        await Cooperatives.update(
            {
                name:busData.name,
                address:busData.address,
                phone:busData.phone,
                email:busData.email,
                logo:busData.logo
            },{where:{id:busData.id}}
        )
    }catch(error){
        return handleSequelizeError(error);
    }
};