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
    }
}, {
    sequelize: connectionDb,
    tableName: 'Routes',
    timestamps: false
});

export default Routes;
