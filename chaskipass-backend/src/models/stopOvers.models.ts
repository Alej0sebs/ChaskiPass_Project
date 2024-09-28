import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const StopOvers= connectionDb.define('stopOver',{
    id:{
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    route_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    station_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    order:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
});