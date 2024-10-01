import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class ClientCooperatives extends Model<
    InferAttributes<ClientCooperatives>,
    InferCreationAttributes<ClientCooperatives>
> {
    public id!: string;
    public cooperative_id!: string;
    public client_dni!: string;
}

ClientCooperatives.init({
    id: {
        type: DataTypes.STRING(30),
        primaryKey: true,
    },
    cooperative_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    client_dni: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'client_cooperatives',
});

export default ClientCooperatives;
