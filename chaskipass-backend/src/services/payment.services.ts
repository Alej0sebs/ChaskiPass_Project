import { Transaction } from "sequelize";
import { PaymentT } from "../types/index.types";
import { handleSequelizeError } from "../utils/helpers.utils";
import Payments from "../models/payments.models";

export const paymentService = async (payment: PaymentT, transaction?: Transaction) => {
    const { amount, payment_method, ticket_id, cooperative_id } = payment;

    if (!amount || !payment_method || !ticket_id || !cooperative_id) {
        throw new Error('Missing required payment fields');
    }
    try {
        const paymentRecord = await Payments.create({
            id: 0,
            ticket_id,
            payment_method,
            payment_date: new Date(),
            voucher: `Voucher-${ticket_id}, Pago-${amount}`,
            status: 'completed',
            cooperative_id
        }, { transaction });

        return paymentRecord;
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw handleSequelizeError(error);
    }
};