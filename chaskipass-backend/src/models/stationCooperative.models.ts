import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import connectionDb from "../db/connection.db";

export class StationCooperative extends Model<
    InferAttributes<StationCooperative>,
    InferCreationAttributes<StationCooperative>> {
    declare id: number;
    declare station_id: number;
    declare cooperative_id: string;
}

StationCooperative.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    station_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cooperative_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'Station_cooperative',
    timestamps: false
});