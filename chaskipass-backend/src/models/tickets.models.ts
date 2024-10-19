import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Tickets extends Model<
    InferAttributes<Tickets>,
    InferCreationAttributes<Tickets>
> {
    declare id: number;
    declare client_dni: string;
    declare frequency_id: string;
    declare seat_id: string;
    declare serial_station_id: number;
    declare ticket_code: string;
    declare price: number;
    declare departure_station: number;
    declare arrival_station: number;
    declare date: Date;
}

Tickets.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    client_dni: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    frequency_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    seat_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    serial_station_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    departure_station: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    arrival_station: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    ticket_code: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'Tickets',
});

export default Tickets;
