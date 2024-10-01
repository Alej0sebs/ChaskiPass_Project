import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Seats extends Model<
    InferAttributes<Seats>,
    InferCreationAttributes<Seats>
> {
    public id!: string;
    public bus_id!: string;
    public number_seat!: number;
    public type_seat_id!: string;
}

Seats.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    bus_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    number_seat: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type_seat_id: {
        type: DataTypes.STRING(5),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'seats',
    timestamps: false
});

export default Seats;
