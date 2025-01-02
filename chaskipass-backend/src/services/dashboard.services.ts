import connectionDb from "../db/connection.db";
import Frequencies from "../models/frequencies.models";
import Payments from "../models/payments.models";
import { handleSequelizeError } from "../utils/helpers.utils";
import { QueryTypes } from 'sequelize';


export const getActiveFrequenciesAmountService = async (cooperative_id: string) => {
    try {
        const quantity = await Frequencies.count({
            where: {
                cooperative_id,
            }
        });

        return {
            status: 200,
            json: {
                quantity
            }
        };
    } catch (error) {
        return handleSequelizeError(error);
    }
};

export const getSoldTicketsAmountService = async (cooperative_id: string) => {
    try {
        const quantity = await Payments.count({
            where: {
                cooperative_id,
            }
        });
        return {
            status: 200,
            json: {
                quantity
            }
        }
    } catch (error) {
        return handleSequelizeError(error);
    }
};

export const getClientsAmountService = async (cooperative_id: string) => {
    try {
        const quantity = await Payments.count({
            where: {
                cooperative_id,
            }
        });
        return {
            status: 200,
            json: {
                quantity
            }
        }
    } catch (error) {
        return handleSequelizeError(error);
    }
};

export const getTotalSalesService = async (cooperative_id: string) => {
    try {
        const sqlQuery = `
            SELECT sum(t.price) as total_sales
            FROM Tickets as t
            INNER JOIN Payments as p ON p.cooperative_id = :cooperative_id
            where t.id = p.ticket_id;
        `;

        const totalSales:any = await connectionDb.query(sqlQuery, {
            replacements: { cooperative_id },
            type: QueryTypes.SELECT
        });

        const totalSalesValue = totalSales[0]?.total_sales || 0;
        console.log(totalSalesValue);
        return{
            status: 200,
            json: {
                sales:totalSalesValue
            }
        };

    } catch (error) {
        return handleSequelizeError(error);
    }
};