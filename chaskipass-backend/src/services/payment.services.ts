import { Transaction } from "sequelize";
import { PaymentT } from "../types/index.types";
import { handleSequelizeError } from "../utils/helpers.utils";
import Payments from "../models/payments.models";

export const paymentService = async (payment: PaymentT | PaymentT[], transaction?: Transaction):Promise<Payments | Payments[]> => {
    try {
        // Si `payment` es un arreglo, usa `bulkCreate` para crear múltiples pagos
        if (Array.isArray(payment)) {
            const paymentRecords = payment.map((paymentItem) => ({
                id: 0,
                ticket_id: paymentItem.ticket_id,
                payment_method: paymentItem.payment_method,
                payment_date: new Date(),
                voucher: `Voucher-${paymentItem.ticket_id}, Pago-${paymentItem.amount}`,
                status: 'completed' as 'completed',
                cooperative_id: paymentItem.cooperative_id,
            }));

            return await Payments.bulkCreate(paymentRecords, { transaction });
        }

        // Si `payment` es un objeto único, usa `create` para crear un solo pago
        const { amount, payment_method, ticket_id, cooperative_id } = payment;
        if (!amount || !payment_method || !ticket_id || !cooperative_id) {
            throw new Error('Missing required payment fields');
        }

        return await Payments.create(
            {
                id: 0,
                ticket_id,
                payment_method,
                payment_date: new Date(),
                voucher: `Voucher-${ticket_id}, Pago-${amount}`,
                status: 'completed',
                cooperative_id,
            },
            { transaction }
        );
    } catch (error) {
        // Manejar el error usando handleSequelizeError si es un error de Sequelize
        if (transaction) {
            await transaction.rollback();
        }
        throw handleSequelizeError(error);
    }
};