import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class TemporalTickets extends Model<
    InferAttributes<TemporalTickets>,
    InferCreationAttributes<TemporalTickets>
> {
    declare id: number;
    declare seat_id: string;
    declare client_dni: string;
    declare frequency_id: string;
    declare departure_station: string;
    declare arrival_station: string;
    declare date: Date;
    declare price: number;
    declare status: string;
}

TemporalTickets.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    seat_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    client_dni: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    frequency_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    departure_station: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    arrival_station: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'Temporaltickets',
});

export default TemporalTickets;
