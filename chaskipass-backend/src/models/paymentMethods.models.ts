import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const PaymentMethods= connectionDb.define('payment_methods',{
    id:{
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
});