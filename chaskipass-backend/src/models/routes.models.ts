import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Routes extends Model<
    InferAttributes<Routes>,
    InferCreationAttributes<Routes>
> {
    public id!: string;
    public departure_station_id!: string;
    public arrival_station_id!: string;
    public cooperative_id!: string;
}

Routes.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    departure_station_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    arrival_station_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    cooperative_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'route',
    timestamps: false
});

export default Routes;
