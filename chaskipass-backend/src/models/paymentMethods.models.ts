import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class PaymentMethods extends Model<
    InferAttributes<PaymentMethods>,
    InferCreationAttributes<PaymentMethods>
> {
    declare id: string;
    declare name: string;
}

PaymentMethods.init({
    id: {
        type: DataTypes.CHAR(3),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'Payment_methods',
    timestamps: false
});

export default PaymentMethods;
