import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import connectionDb from "../db/connection.db";

export class SerialStation extends Model<
    InferAttributes<SerialStation>,
    InferCreationAttributes<SerialStation>> {
    declare id: number;
    declare station_id: number;
    declare user_id: string;
    declare cooperative_id: string;
    declare serial_number: string;
    declare status:boolean;
}

SerialStation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    station_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    cooperative_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    serial_number: {
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
}, {
    sequelize: connectionDb,
    tableName: 'Serial_station',
    timestamps: false
})