import { SeatStatus } from "../models/seatStatus.models";
import { BusStructureT, SeatsStructureT, SeatT } from "../types/index.types";
import { handleSequelizeError } from "../utils/helpers.utils";
import { getBusStructureBYIDService } from "./busStructure.services";
import { getTypeSeatsService } from "./typeSeats.services";

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

interface SeatType {
    special_caracter: string;
    additional_cost: number;
}


export const getSeatsStructureService = async ({
    cooperative_id,
    bus_id,
    frequency_id,
    bus_structure_id,
}: SeatsStructureT) => {
    try {
        // Obtener la estructura del autobús
        const busStructureData: BusStructureT = await getBusStructureBYIDService(bus_structure_id) as BusStructureT;

        if (!busStructureData) {
            return { status: 404, json: { msg: 'Estructura de autobús no encontrada' } };
        }

        // Obtener los asientos de la frecuencia
        const frequencySeats = await SeatStatus.findAll({
            where: { frequency_id },
            raw: true,
        });

        if (!frequencySeats.length) {
            return { status: 404, json: { msg: 'No se encontraron asientos para la frecuencia proporcionada' } };
        };

        // Obtener los tipos de asientos
        const typeSeatsResponse = await getTypeSeatsService(cooperative_id);

        if (typeSeatsResponse.status !== 200 || !Array.isArray(typeSeatsResponse.json)) {
            return { status: 400, json: { msg: 'Error al obtener los tipos de asientos' } };
        };

        const typeSeats: SeatType[] = typeSeatsResponse.json;

        const seatTypeMap: { [key: string]: number } = {};
        typeSeats.forEach((type) => {
            seatTypeMap[type.special_caracter] = Number(type.additional_cost);
        });

        // Crear un mapa de asientos para un acceso rápido
        const seatMap: {
            [key: string]: { fullId: string; status: string; additionalCost: number };
        } = {};
        frequencySeats.forEach((seat) => {
            // Extraer el identificador del tipo de asiento
            const parts = seat.seat_id.split('-');
            const layoutSeatID = parts.slice(-3).join('-');
            const typeIdentifier = parts[3].charAt(0); // Primer carácter del nombre del asiento
            const additionalCost = seatTypeMap[typeIdentifier] || 0;
            // Construir el objeto del asiento con el costo adicional
            seatMap[layoutSeatID] = {
                fullId: seat.seat_id,
                status: seat.status,
                additionalCost: additionalCost,
            };
        });

        const busStructure = JSON.parse(busStructureData.layout);
        const updatedBusStructure: { [floor: string]: any[] } = {};

        for (const [floor, seats] of Object.entries(busStructure) as [string, Seat[]][]) {
            updatedBusStructure[floor] = seats.map((seat: any) => {
                const seatInfo = seatMap[seat.id];
                if (seatInfo) {
                    return {
                        ...seat,
                        id: seatInfo.fullId,
                        status: seatInfo.status,
                        additionalCost: seatInfo.additionalCost,
                    };
                }
                return {
                    ...seat,
                };
            });
        }

        return { status: 200, json: updatedBusStructure };
    } catch (error) {
        return handleSequelizeError(error);
    }
};