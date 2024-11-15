import { Request, Response } from "express";
import { createTypeSeatService, getTypeSeatsService } from "../services/typeSeats.services";
import { CreateTypeSeatT } from "../types/index.types";

export const getTypeSeats = async (req: Request, res: Response) => {
    try {
        const cooperative_id = req.userReq?.cooperative_id || "";
        const result = await getTypeSeatsService(cooperative_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};

export const createTypeSeat = async (req: Request, res: Response) => {
    try {
        const cooperative_id = req.userReq?.cooperative_id || "";
        const { name, description, additional_cost, special_caracter } = req.body;
        const values: CreateTypeSeatT = {
            cooperative_id,
            name: name as string,
            description: description as string,
            special_caracter: special_caracter as string,
            additional_cost: additional_cost as number
        };
        const result = await createTypeSeatService(values);
        if(result.status !== 201) {
            res.status(201).json(result.json);
            return;
        }
        res.status(201).json(result.json);
        return;
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};