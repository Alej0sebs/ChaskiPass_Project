import { Op, Transaction, where } from "sequelize";
import { HandleMessages } from "../error/handleMessages.error";
import Frequencies from "../models/frequencies.models";
import Routes from "../models/routes.models";
import StopOvers from "../models/stopOvers.models";
import { Users } from "../models/users.models";
import { EditFrequencyT, FrequencyT } from "../types/index.types";
import { RoleEnum } from "../utils/enums.utils";
import { handleSequelizeError } from "../utils/helpers.utils";
import { v4 as uuidv4 } from 'uuid';
import connectionDb from "../db/connection.db";
import Seats from "../models/seats.models";
import { SeatStatus } from "../models/seatStatus.models";

export const createFrequencyService = async ({ cooperative_id, bus_id, route_id, driver_id, date, departure_time, arrival_time, price, status }: FrequencyT) => {
    try {
        await connectionDb.transaction(async (transaction) => {

            // Verificar si la ruta existe
            const routeExists = await Routes.findOne({ where: { id: route_id }, transaction });
            if (!routeExists) {
                return { status: 400, json: { msg: HandleMessages.ROUTE_NOT_FOUND } };
            }

            // Verificar si la ruta tiene paradas intermedias
            const stopOverExists = await StopOvers.count({ where: { route_id }, transaction }) > 0;

            // Verificar si ya existe una frecuencia en el mismo horario y fecha para esta ruta
            const frequencyExists = await Frequencies.findOne({ where: { route_id, date, departure_time, arrival_time }, transaction });
            if (frequencyExists) {
                return { status: 400, json: { msg: HandleMessages.FREQUENCY_ALREADY_EXISTS } };
            }

            // Verificar que el conductor exista, sea de rol chofer y no tenga frecuencias activas en el mismo rango de tiempo
            const driver = await Users.findOne({ where: { dni: driver_id, role_id: RoleEnum.driver }, attributes: ['dni'], transaction });
            if (!driver) {
                return { status: 400, json: { msg: HandleMessages.DRIVER_NOT_FOUND } };
            }

            // Verificar superposición de horarios de frecuencias del conductor para la misma fecha
            const isOverlapping = await Frequencies.findOne({
                where: {
                    driver_id,
                    date,
                    [Op.or]: [
                        { departure_time: { [Op.lt]: arrival_time }, arrival_time: { [Op.gt]: departure_time } },
                        { arrival_time: { [Op.gt]: calculateWorkHours(departure_time, 8) } } //8 horas para el descanso
                    ]
                },
                attributes: ["id"],
                transaction
            });

            if (isOverlapping) {
                return { status: 400, json: { msg: HandleMessages.DRIVER_HAS_CONFLICTING_FREQUENCY } };
            }

            // Generar el ID de la frecuencia y crear la frecuencia
            const id = uuidv4();
            const newFrequency = await Frequencies.create({
                id,
                cooperative_id: cooperative_id || '',
                bus_id,
                route_id,
                date,
                driver_id,
                departure_time,
                arrival_time,
                status, // true: activo, false: inactivo
                trip_type: stopOverExists, // true: con paradas, false: directo
                price
            },{transaction});

            // Obtener los asientos del bus
            const seats = await Seats.findAll({ where: { bus_id }, attributes: ['id'], transaction });
            if (seats.length === 0) {
                return { status: 400, json: { msg: HandleMessages.NO_SEATS_FOUND } };
            }

            // Crear los registros en SeatStatus para la nueva frecuencia
            const seatStatusEntries = seats.map((seat) => ({
                id: 0,
                seat_id: seat.id,
                frequency_id: newFrequency.id,
                status: "f", // f: free, r: reserved, s: sold
                reservation_date: null,
                client_dni: null
            }));

            // Insertar los registros en la tabla SeatStatus
            await SeatStatus.bulkCreate(seatStatusEntries,  { transaction });
        });
        return { status: 201, json: { msg: HandleMessages.FREQUENCY_CREATED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};


const calculateWorkHours = (time: string, breakHours: number) => {
    const timeToNumber: number = parseInt(time);
    return timeToNumber - breakHours
}


export const getFrequenciesService = async (cooperative_id: string) => {
    try {
        const sqlQuery = `
    SELECT 
        fr.id,
        fr.date,
        fr.departure_time,
        fr.arrival_time,
        u.dni AS driver_dni,
        CONCAT(u.name, ' ',u.last_name) AS driver_name,
        bus.id as bus_id,
        bus.license_plate,
        bus.bus_number,
        bus.bus_structure_id,
        fr.price,
        fr.status,
        bs1.id AS departure_station_id,
        bs1.name AS departure_station_name,
        cit1.name AS departure_city_name,
        bs2.id AS arrival_station_id,
        bs2.name AS arrival_station_name,
        cit2.name AS arrival_city_name,
        GROUP_CONCAT(stopStation.id ORDER BY stops.order SEPARATOR ', ') AS stop_station_ids,
        GROUP_CONCAT(stopStation.name ORDER BY stops.order SEPARATOR ', ') AS stop_station_names,
        GROUP_CONCAT(stopCity.name ORDER BY stops.order SEPARATOR ', ') AS stop_city_names
    FROM 
        Frequencies AS fr
    INNER JOIN 
        Routes AS r ON r.id = fr.route_id
    INNER JOIN 
        Bus_stations AS bs1 ON bs1.id = r.departure_station_id
    INNER JOIN 
        Cities AS cit1 ON cit1.id = bs1.city_id
    INNER JOIN 
        Bus_stations AS bs2 ON bs2.id = r.arrival_station_id
    INNER JOIN 
        Cities AS cit2 ON cit2.id = bs2.city_id
    INNER JOIN
        Buses AS bus ON bus.id = fr.bus_id
    LEFT JOIN 
        Cooperatives AS c ON c.id = fr.cooperative_id
    LEFT JOIN 
        Users AS u ON u.dni = fr.driver_id
    LEFT JOIN 
        Stopovers AS stops ON r.id = stops.route_id
    LEFT JOIN 
        Bus_stations AS stopStation ON stops.station_id = stopStation.id
    LEFT JOIN 
        Cities AS stopCity ON stopStation.city_id = stopCity.id
    WHERE 
        fr.cooperative_id = :cooperative_id AND fr.date >= CURRENT_DATE
    GROUP BY
            fr.id, fr.date, fr.departure_time, fr.arrival_time, 
            bus.license_plate, bus.bus_number, fr.price, fr.status, 
            bs1.name, cit1.name, bs2.name, cit2.name
    `;

        const [listFrequencies] = await connectionDb.query(sqlQuery, {
            replacements: { cooperative_id },
        });

        return {
            status: 200,
            json: {
                listFrequencies
            }
        };
    } catch (error) {
        return handleSequelizeError(error);
    }
};


export const editFrequencyService = async ({ id, bus_id, driver_id, date, departure_time, arrival_time, price, status }: EditFrequencyT) => {
    try {
        await Frequencies.update({
            bus_id,
            driver_id,
            date,
            departure_time,
            arrival_time,
            price,
            status
        }, {
            where: { id }
        });
        return { status: 200, json: { msg: HandleMessages.FREQUENCY_UPDATED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};

export const deleteFrequencyByIDService = async (id: string) => {
    try {
        await Frequencies.destroy({ where: { id } });
        return { status: 200, json: { msg: HandleMessages.FREQUENCY_DELETED_SUCCESSFULLY } };
    } catch (error) {
        return handleSequelizeError(error);
    }
};