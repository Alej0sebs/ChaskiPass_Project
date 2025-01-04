import { json } from "sequelize";
import connectionDb from "../db/connection.db";
import { HandleMessages } from "../error/handleMessages.error";
import ClientCooperatives from "../models/clientCooperatives";
import Clients from "../models/clients.models";
import Cooperatives from "../models/cooperatives.models";
import { SeatStatus } from "../models/seatStatus.models";
import Tickets from "../models/tickets.models";
import { DataPaginationT, TicketClientInformationT, TicketData } from "../types/index.types";
import { handleSequelizeError } from "../utils/helpers.utils";
import { paymentService } from "./payment.services";
import { QueryTypes } from 'sequelize';


export const sellTicketService = async (ticket: TicketClientInformationT) => {

    const { arrival_station, date, departure_station, frequency_id, selectedSeats,
        serial_number, cooperative_id, payment_method, serial_id } = ticket;

    try {
        const result = await connectionDb.transaction(async (transaction) => {
            const dateToUse = new Date();
            // Obtener datos de la cooperativa
            const cooperativeData = await Cooperatives.findOne({
                where: { id: cooperative_id },
                attributes: ['ticket_counter'],
                transaction,
                lock: transaction.LOCK.UPDATE,
            });

            if (!cooperativeData) {
                throw new Error(HandleMessages.COOPERATIVE_NOT_FOUND);
            }

            let ticketCounter = cooperativeData.ticket_counter;

            // Actualizar estado de asientos en lote
            const seatUpdates = selectedSeats.map((seat) => ({
                seat_id: seat.seatId,
                status: 'r',
                client_dni: seat.client?.dni || null,
                reservation_date: dateToUse,
            }));

            for (const update of seatUpdates) {
                await SeatStatus.update(
                    {
                        status: update.status,
                        client_dni: update.client_dni,
                        reservation_date: update.reservation_date,
                    },
                    {
                        where: { seat_id: update.seat_id },
                        transaction,
                    }
                );
            };

            // Crear tickets en lote
            const ticketRecords = selectedSeats.map((tickets, index) => ({
                id: 0,
                arrival_station,
                date,
                departure_station,
                frequency_id,
                price: Number(tickets.priceDestination) + (tickets.additionalCost || 0),
                seat_id: tickets.seatId,
                ticket_code: `${ticket.cooperative_id}-${serial_number}-${(ticketCounter + index + 1).toString()}-${dateToUse.getHours()}-${dateToUse.getMinutes()}`,
                client_dni: tickets.client?.dni || '',
                serial_station_id: serial_id,
            }));

            //Creo los tickets y me retorna el id de los tickets creados
            const createdTickets = await Tickets.bulkCreate(ticketRecords, { transaction, returning: true });

            if (!createdTickets || createdTickets.length === 0) {
                throw new Error('No tickets were created');
            }

            // Crear pagos asociados            
            const paymentRecords = createdTickets.map((tickets, index) => ({
                id: 0,
                amount: ticketRecords[index].price,
                cooperative_id,
                payment_method,
                ticket_id: tickets.id,
            }));

            const paymentResponse = await paymentService(paymentRecords, transaction);
            if (Array.isArray(paymentResponse)) {
                if (paymentResponse.length !== paymentRecords.length) {
                    throw new Error('Payment creation failed for one or more records');
                }
            } else {
                // Si se esperaba un arreglo pero no lo es, lanza un error
                throw new Error('Unexpected single payment response for multiple payment records');
            }
            // Actualizar contador de tickets en la cooperativa
            ticketCounter += selectedSeats.length;
            await Cooperatives.update(
                { ticket_counter: ticketCounter },
                { where: { id: cooperative_id }, transaction }
            );

            // Crear clientes que no existan y enlazar a cooperativas
            const clientsFilter = selectedSeats.filter((seat) => {
                return seat.client && !seat.client.exist;
            });

            const newClients = clientsFilter.map((seat) => ({
                dni: seat.client.dni,
                name: seat.client.name,
                last_name: seat.client.last_name,
                address: '',
                phone: '',
                email: '',
            }));
            await Clients.bulkCreate(newClients, { transaction, ignoreDuplicates: true });
            const newRelations = clientsFilter.map((client) => ({
                id: `${client.client.dni}-${cooperative_id}`,
                client_dni: client.client.dni,
                cooperative_id,
            }));
            await ClientCooperatives.bulkCreate(newRelations, { transaction, ignoreDuplicates: true });

            return ticketRecords;
        });

        return {
            status: 201,
            json: { message: HandleMessages.TICKET_SOLD_SUCESSFULLY, tickets: result },
        };
    } catch (error) {
        return handleSequelizeError(error);
    }
};

export const sellTicketDataService = async (ticketsData: TicketData[]) => {
    try {
        const responses = [];

        for (const ticketData of ticketsData) {
            const { ticketCode } = ticketData;

            // Busca el ticket en la base de datos según el ticketCode
            const ticketInfo = await Tickets.findOne({
                where: { ticket_code: ticketCode }
            });

            if (!ticketInfo) {
                responses.push({
                    status: 404,
                    json: { msg: `Ticket with code ${ticketCode} not found` }
                });
                continue;
            }

            // Actualiza el campo `data` con el objeto TicketData
            await Tickets.update(
                { data: JSON.stringify(ticketData) },
                { where: { ticket_code: ticketCode } }
            );

            responses.push({
                status: 201,
                json: { msg: `Ticket with code ${ticketCode} updated successfully` }
            });
        }

        return {
            status: 201,
            json: responses
        };
    } catch (error) {
        console.error("Error updating tickets:", error);
        return {
            status: 500,
            json: { msg: "Internal Server Error" }
        };
    }
};


export const getFrecuencyClientsService = async (frequency_id: string, { page, limit }: DataPaginationT) => {

    try {
        const pageIndex = Math.max(1, parseInt(page.toString())); // Asegura que page sea al menos 1
        const offset = (pageIndex - 1) * parseInt(limit.toString());
        // Asegúrate de esperar el resultado de la consulta de conteo
        const totalItems = await Tickets.count({ where: { frequency_id } });

        const query: string =
            `SELECT 
    t.client_dni,
    CONCAT(c.name, ' ', c.last_name) AS client_name,
    t.ticket_code,
    t.seat_id
    From Tickets AS t
    INNER JOIN 
    Clients AS c ON t.client_dni = c.dni
    WHERE t.frequency_id= :frequency_id
    LIMIT :limit OFFSET :offset;
    `;

        const [clientList] = await connectionDb.query(query, {
            replacements: { frequency_id, limit: parseInt(limit.toString()), offset }
        });

        const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

        return {
            status: 200,
            json: {
                totalItems,
                totalPages,
                clientList
            }
        }
    } catch (error) {
        return handleSequelizeError(error);
    }
};

export const getAllFrecuencyClientsService = async (frequency_id: string) => {

    try {
        // Asegúrate de esperar el resultado de la consulta de conteo
        const totalItems = await Tickets.count({ where: { frequency_id } });

        const query: string =
            `SELECT 
    t.client_dni,
    CONCAT(c.name, ' ', c.last_name) AS client_name,
    t.ticket_code,
    t.seat_id
    From Tickets AS t
    INNER JOIN 
    Clients AS c ON t.client_dni = c.dni
    WHERE t.frequency_id= :frequency_id;
    `;

        const clientList = await connectionDb.query(query, {
            replacements: { frequency_id },
            type: QueryTypes.SELECT
        });

        return {
            status: 200,
            json: {
                clientList
            }
        }
    } catch (error) {
        return handleSequelizeError(error);
    }
};

export const getTicketDataService = async (seat: string, frequency: string) => {
    try {
        const ticket = await Tickets.findOne({
            where: { seat_id: seat, frequency_id: frequency }
        });
        return {
            status: 200,
            json: ticket?.data
        };
    } catch (error) {
        return handleSequelizeError(error);
    }
}


