import { Model,DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class SeatStatus extends Model<
    InferAttributes<SeatStatus>,
    InferCreationAttributes<SeatStatus>
>{
    declare id:number;
    declare seat_id: string;
    declare frequency_id: string;
    declare status: string;
    declare reservation_date: Date | null;
    declare client_dni: string | null;
}

SeatStatus.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    seat_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    frequency_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(3),
        allowNull: false,
    },
    reservation_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    client_dni: {
        type: DataTypes.STRING(10),
        allowNull: true,
    }
}, {
    sequelize: connectionDb,
    tableName: 'Seat_status',
    timestamps: false
});