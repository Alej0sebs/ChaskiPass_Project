import connectionDb from "../db/connection.db";
import { HandleMessages } from "../error/handleMessages.error";
import Cooperatives from "../models/cooperatives.models";
import { SeatStatus } from "../models/seatStatus.models";
import Tickets from "../models/tickets.models";
import { TicketClientInformationT } from "../types/index.types";

export const sellTicketService = async (ticket: TicketClientInformationT) => {
    const {arrival_station, date, departure_station, frequency_id,id,price,selectedSeats,serial_number, cooperative_id} = ticket;

    await connectionDb.transaction(async (transaction) => {
        //Obtener el numero del ticket de la cooperativa
        const cooperativeData = await Cooperatives.findOne({
            where: {id: cooperative_id},
            attributes: ['ticket_number'],
            transaction
        });

        if(!cooperativeData){
            throw new Error(HandleMessages.COOPERATIVE_NOT_FOUND);
        }

        const newTicketNumber = cooperativeData.ticket_counter + 1;
        await Cooperatives.update({ticket_counter: newTicketNumber}, {where: {id: cooperative_id}, transaction});

        //Codigo del ticket
        const ticketCode = `${serial_number}-${newTicketNumber.toString().padStart(6, '0')}`;

        //Actualizo estado de los asientos seleccionados
        const seatUpdates = selectedSeats.map((seat)=>({
            seat_id:seat.seatId,
            status: 'R',
            client_dni: seat.client?.dni || null,
            reservation_date: new Date(),
        }));

        for(const update of seatUpdates){
            await SeatStatus.update({
                status: update.status,
                client_dni: update.client_dni,
                reservation_date: update.reservation_date
            },{
                where: {seat_id: update.seat_id},
                transaction
            })
        }

        //Iteracion en cada asiento seleccionado y creo el ticket
        // for(const seat)

    });


}