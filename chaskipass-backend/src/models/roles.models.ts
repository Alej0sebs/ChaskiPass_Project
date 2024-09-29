import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const Roles= connectionDb.define('roles',{
    id:{
        type: DataTypes.CHAR(5),
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true
    }
});