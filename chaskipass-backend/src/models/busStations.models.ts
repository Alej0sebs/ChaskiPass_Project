import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const BusStations= connectionDb.define('bus_stations',{
    id:{
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    city_id:{
        type: DataTypes.STRING(5),
        allowNull: false
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    address:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING(14),
        allowNull: true
    },
    open_time:{
        type: DataTypes.TIME,
        allowNull: false
    },
    close_time:{
        type: DataTypes.TIME,
        allowNull: false
    },
});