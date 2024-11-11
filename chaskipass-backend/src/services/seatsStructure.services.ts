import { SeatStatus } from "../models/seatStatus.models";
import { BusStructureT, SeatsStructureT } from "../types/index.types";
import { handleSequelizeError } from "../utils/helpers.utils";
import { getBusStructureBYIDService } from "./busStructure.services";

interface Seat {
    id: string;
    type: string;
    name: string;
    position: { x: number; y: number };
    status?: string; // Propiedad opcional
}

// Definición de la interfaz BusStructureModifiedT
interface BusStructureModifiedT {
    [floor: string]: Seat[];
}


export const getSeatsStructureService = async ({ cooperative_id, bus_id, frequency_id, bus_structure_id }: SeatsStructureT) => {
    try {
        const busStructureData:BusStructureT = await getBusStructureBYIDService(bus_structure_id) as BusStructureT;

        const frequencySeats = await SeatStatus.findAll({
            where: { frequency_id },
            raw: true
        });

        if (!busStructureData || !frequencySeats) {
            return { status: 400, json: { msg: 'Error al obtener la estructura de asientos' } };
        };

        const seatMap: any = {}; //any por el momento
        frequencySeats.forEach(seat => {
            const layoutSeatID = seat.seat_id.split('-').slice(-3).join('-');
            seatMap[layoutSeatID] = { fullId: seat.seat_id, status: seat.status };
        });

        //parse
        const busStructure = JSON.parse(busStructureData.layout);
        const updatedBusStructure:BusStructureModifiedT = {};
        for (const [floor, seats] of Object.entries(busStructure)  as [string, Seat[]][]) {
            updatedBusStructure[floor] = seats.map((seat:Seat) => {
                if (seatMap[seat.id]) {
                    // Reemplazar el id del asiento con el id completo de la frecuencia y agregar el estado
                    return {
                        ...seat,
                        id: seatMap[seat.id].fullId,
                        status: seatMap[seat.id].status
                    };
                }
                // Si el asiento no está en seatMap, se asume que está libre
                return {
                    ...seat
                };
            });
        }
        return { status: 200, json: updatedBusStructure };
    } catch (error) {
        return handleSequelizeError(error);
    }
};