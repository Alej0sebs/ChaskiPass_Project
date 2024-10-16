import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class StopOvers extends Model<
    InferAttributes<StopOvers>,
    InferCreationAttributes<StopOvers>
> {
    declare id: number;
    declare route_id: string;
    declare station_id: string;
    declare order: number;
}

StopOvers.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    route_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    station_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'Stopovers',
    timestamps: false
});

export default StopOvers;
