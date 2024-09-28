import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const Cities= connectionDb.define('cities',{
    id:{
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    province_id:{
        type: DataTypes.CHAR(3),
        allowNull: false
    },
    name:{
        type: DataTypes.STRING(30),
        allowNull: false
    }
});