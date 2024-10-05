
import { Seats } from './../models/seats.models';
import { Buses } from './../models/buses.models';
import { Request, Response } from 'express';
import { HandleMessages } from '../error/handleMessages.error';
import { Op } from 'sequelize';
import TypeSeats from '../models/typeSeats.models';
import { v4 as uuidv4 } from 'uuid';

export const getSeats = async (req: Request, res: Response) => {
    try {
        const { bus_id } = req.query;

        if (typeof bus_id !== 'string') {
            res.status(400).json({ message: 'bus_id debe ser una cadena' })
            return;
        }

        const { page = 1, limit = 10 } = req.query;
        const offset = page ? (parseInt(page.toString()) - 1) * (limit ? parseInt(limit.toString()) : 10) : 0;

        const { rows: seatsList, count: totalItems } = await Seats.findAndCountAll({
            where: {
                bus_id: {
                    [Op.eq]: bus_id
                }
            },
            include: [
                {
                    model: Buses,
                    required: false
                }
            ],
            limit: parseInt(limit.toString()),
            offset: offset
        });

        const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

        res.status(200).json({
            totalItems,
            totalPages,
            currentPage: parseInt(page.toString()),
            list: seatsList
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};



export const createSeat = async (req: Request, res: Response) => {
    try {
        const { bus_id, number_seat, type_seat_id } = req.body; // Obtener los datos del asiento

        // Validar si el type_id existe en TypeSeats
        const typeSeat = await TypeSeats.findOne({
            where: { id: type_seat_id }
        });

        if (!typeSeat) {
            res.status(400).json({
                message: 'type_id no existe en Type_seats'
            });
            return;
        }

        const newSeat = await Seats.create({
            id: uuidv4(), // Genera un id único
            bus_id,
            number_seat,
            type_seat_id,
        });

        res.status(201).json({
            message: HandleMessages.SEAT_CREATED_SUCCESSFULLY,
            seat: newSeat,
        });

        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};


export const updateSeat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { number_seat, type_seat_id } = req.body;

        const seat = await Seats.findOne({
            where: { id },
        });

        if (!seat) {
            res.status(404).json({
                error: HandleMessages.SEAT_NOT_FOUND,
            });
            return;
        }

        await seat.update({
            number_seat,
            type_seat_id
        });

        res.status(200).json({
            message: HandleMessages.SEAT_UPDATED_SUCCESSFULLY,
            seat,
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};

export const deleteSeat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const seat = await Seats.findOne({
            where: { id },
        });

        if (!seat) {
            res.status(404).json({
                error: HandleMessages.SEAT_NOT_FOUND
            });
            return;
        }

        await seat.destroy();

        res.status(200).json({
            message: HandleMessages.SEAT_DELETED_SUCCESSFULLY
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: HandleMessages.INTERNAL_SERVER_ERROR
        });
        return;
    }
};
