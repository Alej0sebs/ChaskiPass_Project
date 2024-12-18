import { Request, Response } from "express";
import { TicketClientInformationT } from "../types/index.types";
import { getFrecuencyClientsService, sellTicketService } from "../services/tickets.services";
import { HandleMessages } from "../error/handleMessages.error";
import { getPaginationData } from "../utils/helpers.utils";

export const sellTicket = async (req: Request, res: Response) => {
    try {
        const { serial_number, frequency_id, price, departure_station, arrival_station, date, selectedSeats, cooperative_id, payment_method, serial_id } = req.body;
        const dataSellTicket: TicketClientInformationT = {
            id: 0,
            serial_number,
            frequency_id,
            price,
            departure_station,
            arrival_station,
            date,
            selectedSeats,
            cooperative_id,
            payment_method,
            serial_id
        };

        //Call to service
        const result = await sellTicketService(dataSellTicket);
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

export const getFrecuencyClients = async (req: Request, res: Response) => {
    try {
        const frequency_id  = req.params.frequency_id;
        console.log(frequency_id);
        const paginationData = getPaginationData(req.query, req.query.pattern as string);
        const result = await getFrecuencyClientsService(frequency_id, paginationData);
        if (result.status !== 200) {
            res.status(result.status).json(result.json);
            return;
        }

        res.status(result.status).json(result.json);
        return;
    } catch (error) {

    }
};