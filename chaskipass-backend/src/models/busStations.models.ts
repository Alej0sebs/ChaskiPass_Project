import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class BusStations extends Model<
    InferAttributes<BusStations>,
    InferCreationAttributes<BusStations>
> {
    declare id: string;
    declare city_id: string;
    declare name: string;
    declare address: string;
    declare phone: string;
    declare open_time: string;
    declare close_time: string;
}

BusStations.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    city_id: {
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(14),
        allowNull: true,
    },
    open_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    close_time: {
        type: DataTypes.TIME,
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'bus_stations',
    timestamps: false
});

export default BusStations;