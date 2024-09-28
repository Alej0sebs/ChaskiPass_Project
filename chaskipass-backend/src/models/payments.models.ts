import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const Payments= connectionDb.define('payment',{
    id:{
        type: DataTypes.STRING(20),
        primaryKey: true,
    },
    ticket_id:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    payment_method:{
        type: DataTypes.CHAR(3),
        allowNull: false
    },
    payment_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    voucher:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    status:{
        type:  DataTypes.ENUM('pending','canceled','completed'),
        allowNull: false
    }
});