import { Transaction } from 'sequelize';
import connectionDb from '../db/connection.db';
import { HandleMessages } from '../error/handleMessages.error';
import Buses from '../models/buses.models';
import Seats from '../models/seats.models';
import { SeatBusT, SeatT } from '../types/index.types';
import { getTypeSeatsService } from './typeSeats.services';


type SeatsLayout = {
    id: string;
    type: string;
    name: string;
    position: {
        x: number;
        y: number;
    };
}
interface DataSeat {
    [key: string]: SeatsLayout[];
}

interface keyValue {
    [keyValue: string]: string;
}

// Servicio para crear un nuevo asiento
export const createSeatService = async ({ layout, license_plate }: SeatBusT, transaction?: Transaction) => {
    try {
        //transactions, permite ingreso atomico de datos y hace rollback automatico si algo falla
        const parsedSeatsLayout: DataSeat = JSON.parse(layout);

        const getIDsByKey = (jsonParsed: DataSeat): string[] => {
            return Object.values(jsonParsed).reduce<string[]>((accumulator, currentArray) => {
                const ids = currentArray
                    .filter(seat => seat.type === 'seat') // Filtrar solo los que tienen type 'seat'
                    .map(seat => seat.id); // Extraer los 'id' de los que quedan
                return accumulator.concat(ids);
            }, []);
        };
        
        const idsList = getIDsByKey(parsedSeatsLayout);

        const bus = await Buses.findOne({ where: { license_plate }, transaction });
        if (bus === null) {
            // Lanzar una excepción para que Sequelize haga rollback
            throw new Error(`HandleMessages.BUS_NOT_FOUND en la asignación de asientos`);
        }

        // Obtener los tipos de asientos disponibles
        const typeSeatsQuery = await getTypeSeatsService(bus.cooperative_id, transaction);
        const listTypeSeats: keyValue = {};
        typeSeatsQuery.forEach((e) => {
            listTypeSeats[e.special_caracter] = e.id;
        });

        const bulkSeats = idsList.map((seat) => {
            const parts = seat.split('-');
            const typeSeatCaracter = parts[1];
            const typeSeatId = listTypeSeats[typeSeatCaracter];

            return {
                id: `${license_plate}-${seat}`,
                bus_id: bus.id,
                type_seat_id: typeSeatId,
                base_seat: seat,
            };
        });

        // Insertar los asientos
        await Seats.bulkCreate(bulkSeats, { transaction });

        return { status: 201, json: { message: `${HandleMessages.SEAT_CREATED_SUCCESSFULLY} del bus ${license_plate}` } };
    } catch (error) {
        //Lanzo error para que se haga el rollback
        console.log(error);
        throw error;
    }
};
