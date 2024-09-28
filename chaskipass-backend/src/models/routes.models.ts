import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize"; 

export const Routes= connectionDb.define('route',{
    id:{
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    departure_station_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    arrival_station_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    }, 
});