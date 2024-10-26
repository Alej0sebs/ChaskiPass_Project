import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Frequencies extends Model<
    InferAttributes<Frequencies>,
    InferCreationAttributes<Frequencies>
> {
    declare id: string;
    declare cooperative_id: string;
    declare bus_id: number;
    declare route_id: string;
    declare date: Date;
    declare departure_time: string;
    declare arrival_time: string;
    declare status: boolean;
    declare trip_type: boolean;
    declare price: number;
}

Frequencies.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    cooperative_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    bus_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    route_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
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
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    trip_type: {
        type: DataTypes.BOOLEAN,  // 0: direct, 1: with stops
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'Frequencies',
    timestamps: false
});

export default Frequencies;
