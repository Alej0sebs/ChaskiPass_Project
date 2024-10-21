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
export const createSeatService = async ({layout, license_plate}:SeatT) => {
    const parsedSeatsLayout:DataSeat = JSON.parse(layout);

    const getIDsByKey = (jsonParsed:DataSeat):string[] => {
        let seatIDs: string[] = [];

        for(const key in jsonParsed){
            if (jsonParsed.hasOwnProperty(key)) {
                // Concatenamos los IDs de los asientos a seatIDs
                seatIDs = seatIDs.concat(jsonParsed[key].map(seat => seat.id));
            }
        }
        return seatIDs;
    }

    const idsList = getIDsByKey(parsedSeatsLayout);
    //Creo claves primarias para los asientos usando la placa del bus
    const bus= await Buses.findOne({where: {license_plate}});
    if(bus === null) return { status: 404, json: { error: `HandleMessages.BUS_NOT_FOUND ${'En la asignacion de asientos'}` } };
    idsList.map((seat) => {
        Seats.create({
            id: `${license_plate}-${seat}`,
            bus_id: bus.id,
            type_seat_id: seat,
            base_seat: seat,
        });
    });

    // return { status: 201, json: { message: HandleMessages.SEAT_CREATED_SUCCESSFULLY, seat: newSeat } };
};
