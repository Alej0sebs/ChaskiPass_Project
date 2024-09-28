import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const Provinces= connectionDb.define('provinces',{
    id:{
        type: DataTypes.CHAR(3),
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING(30),
        allowNull: false
    }
});