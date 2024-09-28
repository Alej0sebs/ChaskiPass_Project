import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const Cooperatives= connectionDb.define('cooperatives',{
    id:{
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    address:{
        type: DataTypes.STRING(80),
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING(14),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true
    }
});