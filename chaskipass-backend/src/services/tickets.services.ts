import connectionDb from "../db/connection.db";
import { HandleMessages } from "../error/handleMessages.error";
import Cooperatives from "../models/cooperatives.models";
import { SeatStatus } from "../models/seatStatus.models";
import Tickets from "../models/tickets.models";
import { ClientsT, TicketClientInformationT } from "../types/index.types";
import { createClientService } from "./clients.services";

export const sellTicketService = async (ticket: TicketClientInformationT) => {
    const {arrival_station, date, departure_station, frequency_id,id,price,selectedSeats,serial_number, cooperative_id} = ticket;

    await connectionDb.transaction(async (transaction) => {
        //Obtener el numero del ticket de la cooperativa
        const cooperativeData = await Cooperatives.findOne({
            where: {id: cooperative_id},
            attributes: ['ticket_number'],
            transaction,
            lock: transaction.LOCK.UPDATE
        });

        if(!cooperativeData){
            throw new Error(HandleMessages.COOPERATIVE_NOT_FOUND);
        }

        let ticketCounter = cooperativeData.ticket_counter;
        // await Cooperatives.update({ticket_counter: newTicketNumber}, {where: {id: cooperative_id}, transaction});

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
        for(const tickets of selectedSeats){
            ticketCounter++;
            await Tickets.create({
                id:0,
                arrival_station,
                date,
                departure_station,
                frequency_id,
                price: price + (tickets.additionalCost || 0),
                seat_id: tickets.seatId,
                ticket_code: `${serial_number}-${ticketCounter.toString().padStart(6, '0')}`,
                client_dni: tickets.client?.dni || '',
                serial_station_id: serial_number
            }, {transaction});
        }

        await Cooperatives.update({ticket_counter: ticketCounter}, {where: {id: cooperative_id}, transaction});

        //Crear usuarios que no existan
        const clientsFilter = selectedSeats.filter((seat) => {
            return seat.client.exist === false;
        });

        for(const client of clientsFilter){
            let clientData:ClientsT = {
                    dni: client.client.dni,
                    name: client.client.name,
                    last_name: client.client.last_name,
                    address: "",
                    phone: "",
                    email: ""
            }
            createClientService(clientData, transaction);

            
        }


    });
}


