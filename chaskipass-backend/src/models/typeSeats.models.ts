import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const TypeSeats= connectionDb.define('type_seats',{
    id:{
        type: DataTypes.STRING(5),
        primaryKey: true,
    },
    cooperative_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true
    }
});