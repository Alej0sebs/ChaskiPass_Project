import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const Role= connectionDb.define('role',{
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