import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class StopOvers extends Model<
    InferAttributes<StopOvers>,
    InferCreationAttributes<StopOvers>
> {
    public id!: string;
    public route_id!: string;
    public station_id!: string;
    public order!: number;
}

StopOvers.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    route_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    station_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'stopOver',
    timestamps: false
});

export default StopOvers;
