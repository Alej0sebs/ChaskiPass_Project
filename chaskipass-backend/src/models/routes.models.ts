import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Routes extends Model<
    InferAttributes<Routes>,
    InferCreationAttributes<Routes>
> {
    declare id: string;
    declare departure_station_id: number;
    declare arrival_station_id: number;
    declare cooperative_id: string;
    declare departure_time: string;
    declare arrival_time: string;
    declare default_price: number;
}

Routes.init({
    id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
    },
    departure_station_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    arrival_station_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cooperative_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    departure_time: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    arrival_time: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    default_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: connectionDb,
    tableName: 'Routes',
    timestamps: false
});

export default Routes;
