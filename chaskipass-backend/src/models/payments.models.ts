import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Payments extends Model<
    InferAttributes<Payments>,
    InferCreationAttributes<Payments>
> {
    public id!: string;
    public ticket_id!: string;
    public payment_method!: string;
    public payment_date!: Date;
    public voucher!: string;
    public status!: 'pending' | 'canceled' | 'completed';
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
    tableName: 'payment',
    timestamps: false
});

export default Payments;
