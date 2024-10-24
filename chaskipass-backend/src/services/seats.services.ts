import { Transaction } from 'sequelize';
import connectionDb from '../db/connection.db';
import { HandleMessages } from '../error/handleMessages.error';
import Buses from '../models/buses.models';
import Seats from '../models/seats.models';
import { SeatBusT, SeatT } from '../types/index.types';
import { getTypeSeatsService } from './typeSeats.services';
import { handleSequelizeError } from '../utils/helpers.utils';
import TypeSeats from '../models/typeSeats.models';


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
        // Parsear el layout de los asientos
        const parsedSeatsLayout: DataSeat = JSON.parse(layout);

        // Función para obtener los IDs de los asientos del layout
        const getIDsByKey = (jsonParsed: DataSeat): string[] => {
            return Object.values(jsonParsed).reduce<string[]>((accumulator, currentArray) => {
                const ids = currentArray
                    .filter(seat => seat.type === 'seat') // Filtrar solo los que tienen type 'seat'
                    .map(seat => seat.id); // Extraer los 'id' de los que quedan
                return accumulator.concat(ids);
            }, []);
        };

        const idsList = getIDsByKey(parsedSeatsLayout);

        // Buscar el bus basado en la placa
        const bus = await Buses.findOne({ where: { license_plate }, transaction });
        if (bus === null) {
            throw new Error(HandleMessages.BUS_NOT_FOUND);
        }

        // Obtener los tipos de asientos disponibles
        const typeSeatsResponse = await getTypeSeatsService(bus.cooperative_id, transaction);
        
        // Verificar si la respuesta fue exitosa y contiene datos
        if (typeSeatsResponse.status !== 200) {
            const errorData = typeSeatsResponse.json as { error: string };
            throw new Error(errorData.error);
        }

        const typeSeatsQuery = typeSeatsResponse.json as TypeSeats[];
        const listTypeSeats: keyValue = {};
        typeSeatsQuery.forEach((e) => {
            listTypeSeats[e.special_caracter] = e.id;
        });

        // Preparar los asientos para insertar
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

        // Insertar los asientos en la base de datos
        await Seats.bulkCreate(bulkSeats, { transaction });

        return { status: 201, json: { message: `${HandleMessages.SEAT_CREATED_SUCCESSFULLY} del bus ${license_plate}` } };
    } catch (error) {
        // Manejar el error usando handleSequelizeError si es un error de Sequelize
        if (transaction) {
            await transaction.rollback();
        }

        // Registrar el error para depuración
        console.error('Error en la creación de asientos:', error);

        // Lanzar el error para que sea manejado por el controlador o la función superior
        throw handleSequelizeError(error);
    }
};


