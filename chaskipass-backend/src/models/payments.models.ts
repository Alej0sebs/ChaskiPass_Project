import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Payments extends Model<
    InferAttributes<Payments>,
    InferCreationAttributes<Payments>
> {
    declare id: string;
    declare ticket_id: string;
    declare payment_method: string;
    declare payment_date: Date;
    declare voucher: string;
    declare status: 'pending' | 'canceled' | 'completed';
}

Payments.init({
    id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
    },
    ticket_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.CHAR(3),
        allowNull: false,
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    voucher: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'canceled', 'completed'),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'payments',
    timestamps: false
});

export default Payments;
