import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const Buses= connectionDb.define('buses',{
    id:{
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    cooperative_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    bus_number:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    license_plate:{
        type: DataTypes.STRING(8),
        allowNull: false
    },
    chassis_vin:{
        type: DataTypes.STRING(17),
        allowNull: false
    },
    bus_manufacturer:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    model:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    year:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    capacity:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    picture:{
        type: DataTypes.TEXT,
        allowNull: true
    }
    
});