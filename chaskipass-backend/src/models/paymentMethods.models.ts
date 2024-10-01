import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class PaymentMethods extends Model<
    InferAttributes<PaymentMethods>,
    InferCreationAttributes<PaymentMethods>
> {
    public id!: string;
    public name!: string;
}

PaymentMethods.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'payment_methods',
    timestamps: false
});

export default PaymentMethods;
