import { Request, Response } from "express";
import { TicketClientInformationT } from "../types/index.types";
import { sellTicketService } from "../services/tickets.services";
import { handleSequelizeError } from "../utils/helpers.utils";
import { HandleMessages } from "../error/handleMessages.error";

export const sellTicket = async (req: Request, res: Response) => {
    try{
        const {serial_number, frequency_id, price, departure_station, arrival_station, date, selectedSeats, cooperative_id} = req.body;
        const dataSellTicket:TicketClientInformationT = {
            id: 0,
            serial_number,
            frequency_id,
            price,
            departure_station,
            arrival_station,
            date,
            selectedSeats,
            cooperative_id
        };

        //Call to service
        const result = await sellTicketService(dataSellTicket);
        if(result.status !== 201){
            res.status(result.status).json(result.json);
            return;
        }

        res.status(result.status).json(result.json);
        return;
    }catch(error){
        res.status(500).json({ msg: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};