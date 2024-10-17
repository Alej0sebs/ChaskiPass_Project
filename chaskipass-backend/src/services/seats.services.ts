import { Seats } from '../models/seats.models';
import { Buses } from '../models/buses.models';
import TypeSeats from '../models/typeSeats.models';
import { v4 as uuidv4 } from 'uuid';
import { HandleMessages } from '../error/handleMessages.error';
import { DataPaginationT, SeatCreateT } from '../types/index.types';

// Servicio para obtener los asientos de un bus
export const getSeatsService = async (bus_id: string, {page, limit}:DataPaginationT) => {
    const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

    const { rows: seatsList, count: totalItems } = await Seats.findAndCountAll({
        where: { bus_id },
        include: [{ model: Buses, required: false }],
        limit: parseInt(limit.toString()),
        offset
    });

    const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

    return {
        totalItems,
        totalPages,
        currentPage: parseInt(page.toString()),
        list: seatsList
    };
};

// Servicio para crear un nuevo asiento
export const createSeatService = async ({bus_id, number_seat, type_seat_id}:SeatCreateT) => {
    // Verificar si el tipo de asiento existe
    const typeSeat = await TypeSeats.findOne({ where: { id: type_seat_id } });
    if (!typeSeat) {
        return { status: 400, json: { message: 'type_id no existe en Type_seats' } };
    }

    // Crear nuevo asiento
    const newSeat = await Seats.create({
        id: uuidv4(),
        bus_id,
        number_seat,
        type_seat_id
    });

    return { status: 201, json: { message: HandleMessages.SEAT_CREATED_SUCCESSFULLY, seat: newSeat } };
};

// Servicio para actualizar un asiento
export const updateSeatService = async (id: string, number_seat: number, type_seat_id: string) => {
    const seat = await Seats.findOne({ where: { id } });
    if (!seat) {
        return { status: 404, json: { error: HandleMessages.SEAT_NOT_FOUND } };
    }

    // Actualizar asiento
    await seat.update({ number_seat, type_seat_id });

    return { status: 200, json: { message: HandleMessages.SEAT_UPDATED_SUCCESSFULLY, seat } };
};

// Servicio para eliminar un asiento
export const deleteSeatService = async (id: string) => {
    const seat = await Seats.findOne({ where: { id } });
    if (!seat) {
        return { status: 404, json: { error: HandleMessages.SEAT_NOT_FOUND } };
    }

    // Eliminar asiento
    await seat.destroy();

    return { status: 200, json: { message: HandleMessages.SEAT_DELETED_SUCCESSFULLY } };
};
