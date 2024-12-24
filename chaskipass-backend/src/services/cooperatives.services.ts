import { HandleMessages } from "../error/handleMessages.error";
import Cooperatives from "../models/cooperatives.models";
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