import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const Tickets= connectionDb.define('tickets',{
    id:{
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    seat_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    client_dni:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    frequency_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    departure_station:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    arrival_station:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    ticket_code:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
});
