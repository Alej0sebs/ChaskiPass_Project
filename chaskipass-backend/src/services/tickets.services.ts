import connectionDb from "../db/connection.db";
import { HandleMessages } from "../error/handleMessages.error";
import ClientCooperatives from "../models/clientCooperatives";
import Clients from "../models/clients.models";
import Cooperatives from "../models/cooperatives.models";
import Payments from "../models/payments.models";
import { SeatStatus } from "../models/seatStatus.models";
import Tickets from "../models/tickets.models";
import { ClientsT, PaymentT, TicketClientInformationT } from "../types/index.types";
import { handleSequelizeError } from "../utils/helpers.utils";
import { createClientService } from "./clients.services";
import { paymentService } from "./payment.services";

/*export const sellTicketService = async (ticket: TicketClientInformationT) => {
    const { arrival_station, date, departure_station, frequency_id, id, price, selectedSeats, serial_number, cooperative_id, payment_method } = ticket;

    try {
        await connectionDb.transaction(async (transaction) => {
            //Obtener el numero del ticket de la cooperativa
            const cooperativeData = await Cooperatives.findOne({
                where: { id: cooperative_id },
                attributes: ['ticket_number'],
                transaction,
                lock: transaction.LOCK.UPDATE
            });

            if (!cooperativeData) {
                throw new Error(HandleMessages.COOPERATIVE_NOT_FOUND);
            }

            let ticketCounter = cooperativeData.ticket_counter;

            //Actualizo estado de los asientos seleccionados
            const seatUpdates = selectedSeats.map((seat) => ({
                seat_id: seat.seatId,
                status: 'R',
                client_dni: seat.client?.dni || null,
                reservation_date: new Date(),
            }));

            for (const update of seatUpdates) {
                await SeatStatus.update({
                    status: update.status,
                    client_dni: update.client_dni,
                    reservation_date: update.reservation_date
                }, {
                    where: { seat_id: update.seat_id },
                    transaction
                })
            }

            //Iteracion en cada asiento seleccionado y creo el ticket
            for (const tickets of selectedSeats) {
                ticketCounter++;
                await Tickets.create({
                    id,
                    arrival_station,
                    date,
                    departure_station,
                    frequency_id,
                    price: price + (tickets.additionalCost || 0),
                    seat_id: tickets.seatId,
                    ticket_code: `${serial_number}-${ticketCounter.toString().padStart(6, '0')}`,
                    client_dni: tickets.client?.dni || '',
                    serial_station_id: serial_number
                }, { transaction });

                //Guardar el registro de la venta
                const paymentData:PaymentT= {
                    amount: price + (tickets.additionalCost || 0),
                    cooperative_id,
                    payment_method,
                    ticket_id: id
                };
                const paymentRecord = await paymentService(paymentData, transaction);
                if (!paymentRecord) {
                    throw new Error(HandleMessages.PAYMENT_ERROR);
                }
            }

            await Cooperatives.update({ ticket_counter: ticketCounter }, { where: { id: cooperative_id }, transaction });

            //Crear usuarios que no existan
            const clientsFilter = selectedSeats.filter((seat) => {
                return seat.client.exist === false;
            });

            if (clientsFilter.length > 0) {

                for (const client of clientsFilter) {

                    const existingClient = await Clients.findOne({
                        where: { dni: client.client.dni },
                        transaction,
                    });

                    if (!existingClient) {

                        let clientData: ClientsT = {
                            dni: client.client.dni,
                            name: client.client.name,
                            last_name: client.client.last_name,
                            address: "",
                            phone: "",
                            email: ""
                        }
                        await createClientService(clientData, transaction);
                    };

                    // Verificar si la relación cliente-cooperativa ya existe
                    const existingRelation = await ClientCooperatives.findOne({
                        where: {
                            client_dni: client.client.dni,
                            cooperative_id,
                        },
                        transaction,
                    });

                    //Enlazar el cliente a la cooperativa
                    if (!existingRelation) {
                        // Crear la relación cliente-cooperativa
                        await ClientCooperatives.create({
                            id: `${client.client.dni}-${cooperative_id}`,
                            client_dni: client.client.dni,
                            cooperative_id,
                        }, { transaction });
                    };
                }
            }
        });
        return{
            status:201,
            json:{message:HandleMessages.TICKET_SOLD_SUCESSFULLY}
        };
    }catch(error){
        return handleSequelizeError(error);
    }
};*/


export const sellTicketService = async (ticket: TicketClientInformationT) => {
    const {
        arrival_station,
        date,
        departure_station,
        frequency_id,
        price,
        selectedSeats,
        serial_number,
        cooperative_id,
        payment_method,
    } = ticket;

    try {
        const result = await connectionDb.transaction(async (transaction) => {
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
                status: 'R',
                client_dni: seat.client?.dni || null,
                reservation_date: new Date(),
            }));
            await SeatStatus.bulkCreate(seatUpdates, {
                transaction,
                updateOnDuplicate: ['status', 'client_dni', 'reservation_date'], // Campos a actualizar
            });

            // Crear tickets en lote
            const ticketRecords = selectedSeats.map((tickets, index) => ({
                id:0,
                arrival_station,
                date,
                departure_station,
                frequency_id,
                price: price + (tickets.additionalCost || 0),
                seat_id: tickets.seatId,
                ticket_code: `${serial_number}-${(ticketCounter + index + 1).toString().padStart(6, '0')}`,
                client_dni: tickets.client?.dni || '',
                serial_station_id: serial_number,
            }));
            await Tickets.bulkCreate(ticketRecords, { transaction });

            // Crear pagos asociados
            const paymentRecords = selectedSeats.map((tickets) => ({
                id:0,
                amount: price + (tickets.additionalCost || 0),
                cooperative_id,
                payment_method,
                ticket_id: tickets.ticket_id,
            }));
            
            await Payments.bulkCreate(paymentRecords, { transaction });

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




