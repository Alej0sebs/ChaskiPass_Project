import { Request, Response } from "express";
import { TicketClientInformationT, TicketData } from "../types/index.types";
import { getFrecuencyClientsService, sellTicketService, sellTicketDataService, getTicketDataService } from "../services/tickets.services";
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

export const sellTicketData = async (req: Request, res: Response) => {
    try {
        const dataSellTickets: TicketData[] = req.body.map((ticket:TicketData) => {
            const { dia, horaSalida, horaLlegada, placa, terminal, destino, nombres, apellidos, tipoDocumento, numeroDocumento, price, seats, frecuencia, ticketCode } = ticket;
            return {
                dia,
                horaSalida,
                horaLlegada,
                placa,
                terminal,
                destino,
                nombres,
                apellidos,
                tipoDocumento,
                numeroDocumento,
                price,
                seats,
                frecuencia,
                ticketCode
            };
        });
        
        //Call to service
        const result = await sellTicketDataService(dataSellTickets);
        if (result.status !== 201) {
            res.status(result.status).json({ error: HandleMessages.INTERNAL_SERVER_ERROR });
            return;
        }
        res.status(result.status).json({ message: 'Se guardo correctamente' });
        return;
    } catch (error) {
        res.status(500).json({ error: HandleMessages.INTERNAL_SERVER_ERROR });
        return;
    }
};


export const getFrecuencyClients = async (req: Request, res: Response) => {
    try {
        const frequency_id = req.params.frequency_id;
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

export const getTicketData = async (req: Request, res: Response) => {
    try {
        const frequency = req.query.frequency as string;
        const seat = req.query.seat as string;
        const result = await getTicketDataService(seat, frequency);
        if (result.status !== 201) {
            res.status(result.status).json(result.json);
            return;
        }
    } catch (error) {

    }
}