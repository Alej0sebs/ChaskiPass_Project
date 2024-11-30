import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Payments extends Model<
    InferAttributes<Payments>,
    InferCreationAttributes<Payments>
> {
    declare id: number;
    declare ticket_id: number;
    declare payment_method: string;
    declare payment_date: Date;
    declare voucher: string;
    declare status: 'pending' | 'canceled' | 'completed';
    declare cooperative_id: string;
}

Payments.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.CHAR(3),
        allowNull: false,
    },
    payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    voucher: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'canceled', 'completed'),
        allowNull: false,
    },
    cooperative_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'Payments',
    timestamps: false
});

export default Payments;
