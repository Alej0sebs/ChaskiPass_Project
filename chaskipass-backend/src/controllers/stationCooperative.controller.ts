import { Request, Response } from "express";
import { getStationCooperativeService, linkCooperativeStationService } from "../services/stationCooperative.services";
import { StationCooperativeT } from "../types/index.types";
import { getPaginationData } from "../utils/helpers.utils";
import { HandleMessages } from "../error/handleMessages.error";

export const linkCooperativeStation = async (req: Request, res: Response) => {
    try {
        const { cooperative_id } = req.userReq ?? {};
        const { station_id } = req.query;
        const values: StationCooperativeT = {
            id: 0,
            cooperative_id: cooperative_id || "",
            station_id: parseInt(station_id as string)
        };
        const result = await linkCooperativeStationService(values);
        if (result.status !== 201) {
            res.status(result.status).json(result.json);
            return;
        }

        res.status(result.status).json(result.json);
        return;
    } catch (error) {
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};

export const getStationCooperative = async (req: Request, res: Response) => {
    try{
        const { cooperative_id } = req.userReq ?? {};
        const paginationData = getPaginationData(req.query);
        const result = await getStationCooperativeService(cooperative_id!, paginationData);

        res.status(201).json(result);
        return;
    }catch(error){
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
    }
};