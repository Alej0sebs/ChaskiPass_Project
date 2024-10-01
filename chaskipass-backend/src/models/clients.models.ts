import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Clients extends Model<
    InferAttributes<Clients>,
    InferCreationAttributes<Clients>
> {
    declare dni: string;
    declare name: string;
    declare last_name: string;
    declare address: string;
    declare phone: string;
    declare email: string;
}

Clients.init({
    dni: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(80),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(14),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'clients',
    timestamps: false
});

export default Clients;
