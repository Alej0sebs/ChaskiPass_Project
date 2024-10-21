import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Seats extends Model<
    InferAttributes<Seats>,
    InferCreationAttributes<Seats>
> {
    declare id: string;
    declare bus_id: number;
    declare base_seat: string;
    declare type_seat_id: string;
}

Seats.init({
    id: {
        type: DataTypes.STRING(20), //seria mejor usar 36 por el uuid Unico
        primaryKey: true,
    },
    bus_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    base_seat: {
        type: DataTypes.STRING(20),
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
