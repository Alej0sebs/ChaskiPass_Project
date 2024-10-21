import { HandleMessages } from '../error/handleMessages.error';
import Buses from '../models/buses.models';
import Seats from '../models/seats.models';
import { BusT, SeatT } from '../types/index.types';


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

// Servicio para crear un nuevo asiento
export const createSeatService = async ({ layout, license_plate }: SeatT) => {
    try {
        const parsedSeatsLayout: DataSeat = JSON.parse(layout);

        const getIDsByKey = (jsonParsed: DataSeat): string[] => {
            let seatIDs: string[] = [];

            for (const key in jsonParsed) {
                if (jsonParsed.hasOwnProperty(key)) {
                    // Concatenamos los IDs de los asientos a seatIDs
                    seatIDs = seatIDs.concat(jsonParsed[key].map(seat => seat.id));
                }
            }
            return seatIDs;
        }

        const idsList = getIDsByKey(parsedSeatsLayout);
        //Creo claves primarias para los asientos usando la placa del bus
        const bus = await Buses.findOne({ where: { license_plate } });
        if (bus === null) return { status: 404, json: { error: `HandleMessages.BUS_NOT_FOUND ${'En la asignacion de asientos'}` } };

        //({}) -> return implicito
        const bulkSeats = idsList.map((seat) => {
            const parts = seat.split('-');
            const typeSeatId = parts[1];

            return {
                id: `${license_plate}-${seat}`,
                bus_id: bus.id,
                type_seat_id: typeSeatId,
                base_seat: seat,
            }
        });
        //insertar varios registros, enviarlo como objetos
        await Seats.bulkCreate(bulkSeats);
        return { status: 201, json: { message: `${HandleMessages.SEAT_CREATED_SUCCESSFULLY} del bus ${license_plate}` } };
    } catch (error) {
        return { status: 500, json: { error: `${HandleMessages.INTERNAL_SERVER_ERROR} ${error}` } };
    }
};
