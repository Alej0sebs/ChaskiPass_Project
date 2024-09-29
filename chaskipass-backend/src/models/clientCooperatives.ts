import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const ClientCooperatives= connectionDb.define('client_cooperatives',{
    id:{
        type: DataTypes.STRING(30),
        primaryKey: true,
    },
    cooperative_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    }, 
    client_dni:{
        type: DataTypes.STRING(10),
        allowNull: false
    }
});