import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const Users= connectionDb.define('users',{
    dni:{
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING(14),
        allowNull: false
    },
    password:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING(80),
        allowNull:true
    },
    role_id:{
        type: DataTypes.CHAR(5),
        allowNull: false
    },
    cooperative_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    }
});