import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Tickets extends Model<
    InferAttributes<Tickets>,
    InferCreationAttributes<Tickets>
> {
    public id!: string;
    public seat_id!: string;
    public client_dni!: string;
    public frequency_id!: string;
    public departure_station!: string;
    public arrival_station!: string;
    public date!: Date;
    public ticket_code!: string;
    public status!: string;
    public price!: number;
}

Tickets.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
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
    ticket_code: {
        type: DataTypes.TEXT,
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
    tableName: 'tickets',
});

export default Tickets;
