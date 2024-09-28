import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const Seats= connectionDb.define('seats',{
    id:{
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    bus_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    number_seat:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type_seat_id:{
        type: DataTypes.STRING(5),
        allowNull: false
    }, 
});