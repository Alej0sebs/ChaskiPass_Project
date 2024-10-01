import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Frequencies extends Model<
    InferAttributes<Frequencies>,
    InferCreationAttributes<Frequencies>
> {
    public id!: string;
    public cooperative_id!: string;
    public bus_id!: string;
    public route_id!: string;
    public date!: Date;
    public departure_time!: string;
    public arrival_time!: string;
    public state!: boolean;
    public trip_type!: boolean;
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
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    route_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    departure_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    arrival_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    trip_type: {
        type: DataTypes.BOOLEAN,  // 0: direct, 1: with stops
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'frequencies',
    timestamps: false
});

export default Frequencies;
