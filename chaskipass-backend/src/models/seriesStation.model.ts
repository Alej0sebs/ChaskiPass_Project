import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import connectionDb from "../db/connection.db";

export class SeriesStation extends Model<
    InferAttributes<SeriesStation>,
    InferCreationAttributes<SeriesStation>> {
    declare id: number;
    declare station_id: number;
    declare user_id: string;
    declare cooperative_id: string;
    declare series_number: string;
}

SeriesStation.init({
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
    series_number: {
        type: DataTypes.STRING(5),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'Series_station',
    timestamps: false
})