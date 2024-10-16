import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Seats extends Model<
    InferAttributes<Seats>,
    InferCreationAttributes<Seats>
> {
    declare id: string;
    declare bus_id: string;
    declare number_seat: number;
    declare type_seat_id: string;
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
    tableName: 'Seats',
    timestamps: false
});

export default Seats;
