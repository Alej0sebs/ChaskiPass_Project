import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const Frequencies= connectionDb.define('frequencies',{
    id:{
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    cooperative_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    bus_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    route_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    departure_time:{
        type: DataTypes.TIME,
        allowNull: false
    },
    arrival_time:{
        type: DataTypes.TIME,
        allowNull: false
    },
    state:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    trip_type:{
        type: DataTypes.BOOLEAN, // 0: direct, 1: with stops 
        allowNull: false
    }
});