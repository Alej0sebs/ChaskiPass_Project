import { Sequelize } from "sequelize";
import Tickets from "../models/tickets.models";
import { handleSequelizeError } from "../utils/helpers.utils";
import Payments from "../models/payments.models";

//Usar alias.
export const getSalesAmountServices = async(cooperative_id:string) => {
    try{
        const paymentsData = await Payments.findAll({
            include:[
                {
                    model: Tickets,
                    as: 'ticket_payment',
                    attributes: ['price'],
                    required: true,
                }
            ],
            where: {cooperative_id},
            attributes: [[Sequelize.fn('sum', Sequelize.col('ticket_payment.price')), 'total_sales']],
        });
        return paymentsData;
    }catch(error){
        return handleSequelizeError(error);
    }
};

export const getCompletedSalesServices = async() => {

};

export const getEmployeeWithMostSalesServices = async() => {

};