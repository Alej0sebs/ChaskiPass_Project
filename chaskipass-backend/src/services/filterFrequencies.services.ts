import { DataPaginationT, FilterFrequenciesT } from "../types/index.types";
import connectionDb from '../db/connection.db';

type filterConditionsT = Partial<FilterFrequenciesT>;

const buildDynamicWhereClause = (filters: filterConditionsT) => {
    const conditions = [];
    const replacements: filterConditionsT = {};

    if (filters.cooperative_id) {
        conditions.push('fr.cooperative_id = :cooperative_id');
        replacements.cooperative_id = filters.cooperative_id;
    }

    if (filters.date) {
        conditions.push('fr.date = :date');
        replacements.date = filters.date;
    }

    if (filters.departure_time) {
        conditions.push('fr.departure_time = :departure_time');
        replacements.departure_time = filters.departure_time;
    }

    if (filters.arrival_time) {
        conditions.push('fr.arrival_time = :arrival_time');
        replacements.arrival_time = filters.arrival_time;
    }

    if (filters.price !== undefined && filters.price !== null && filters.price > 0) {
        conditions.push('fr.price = :price');
        replacements.price = filters.price;
    }

    if (filters.trip_type !== undefined) {
        conditions.push('fr.trip_type = :trip_type');
        replacements.trip_type = filters.trip_type;
    }

    if (filters.departure_city) {
        conditions.push('cit1.name = :departure_city');
        replacements.departure_city = filters.departure_city;
    }

    if (filters.arrival_city) {
        conditions.push('cit2.name = :arrival_city');
        replacements.arrival_city = filters.arrival_city;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    return { whereClause, replacements };
};

export const filterFrequenciesService = async (conditions: FilterFrequenciesT, { page, limit, pattern }: DataPaginationT) => {
    try {
        const offset = (parseInt(page.toString()) - 1) * parseInt(limit.toString());
        // Construir la cláusula WHERE y los reemplazos
        const { whereClause, replacements } = buildDynamicWhereClause(conditions);

        // Consulta para contar el total de registros sin limit y offset
        const countQuery = `
                SELECT COUNT(*) AS total
                FROM frequencies AS fr
                INNER JOIN routes AS r ON r.id = fr.route_id
                INNER JOIN bus_stations AS bs1 ON bs1.id = r.departure_station_id
                INNER JOIN cities AS cit1 ON cit1.id = bs1.city_id
                INNER JOIN bus_stations AS bs2 ON bs2.id = r.arrival_station_id
                INNER JOIN cities AS cit2 ON cit2.id = bs2.city_id
                LEFT JOIN cooperatives AS c ON c.id = fr.cooperative_id
                ${whereClause};
            `;

        // Ejecutar la consulta de conteo para obtener totalItems
        const [countResult] = await connectionDb.query(countQuery, { replacements });
        const totalItems = (countResult as any)[0].total;

        const sqlQuery = `
            SELECT 
                fr.id AS frequency_id,
                fr.date,
                fr.departure_time,
                fr.arrival_time,
                fr.price,
                bs1.id AS departure_station_id,
                bs1.name AS departure_station_name,
                cit1.id AS departure_city_id,
                cit1.name AS departure_city_name,
                bs2.id AS arrival_station_id,
                bs2.name AS arrival_station_name,
                cit2.id AS arrival_city_id,
                cit2.name AS arrival_city_name,
                c.name AS cooperative_name
            FROM 
                frequencies AS fr
            INNER JOIN 
                routes AS r ON r.id = fr.route_id
            INNER JOIN 
                bus_stations AS bs1 ON bs1.id = r.departure_station_id
            INNER JOIN 
                cities AS cit1 ON cit1.id = bs1.city_id
            INNER JOIN 
                bus_stations AS bs2 ON bs2.id = r.arrival_station_id
            INNER JOIN 
                cities AS cit2 ON cit2.id = bs2.city_id
            LEFT JOIN 
                cooperatives AS c ON c.id = fr.cooperative_id
            ${whereClause}
            LIMIT :limit OFFSET :offset;
        `;

        // Agregar limit y offset a los reemplazos
        const params = {
            ...replacements,
            limit: parseInt(limit.toString()),
            offset,
        };

        // Ejecutar la consulta
        const [frequencyList] = await connectionDb.query(sqlQuery, {
            replacements: params
        });

        const totalPages = Math.ceil(totalItems / parseInt(limit.toString()));

        return {
            status: 200,
            json: {
                totalItems,
                totalPages,
                currentPage: parseInt(page.toString()),
                list: frequencyList,
            }
        };

    } catch (error) {
        // Manejo de errores según tu lógica
        console.error('Error al filtrar frecuencias:', error);
        return { status: 500, message: 'Error en el servicio' };
    }
};
