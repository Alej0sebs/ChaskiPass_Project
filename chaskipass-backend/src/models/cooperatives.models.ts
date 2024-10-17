import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Cooperatives extends Model<
    InferAttributes<Cooperatives>,
    InferCreationAttributes<Cooperatives>
> {
    declare id: string;
    declare name: string;
    declare address: string;
    declare phone: string;
    declare email: string;
    declare logo: string;
}

Cooperatives.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
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
    },
    logo: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    sequelize: connectionDb,
    tableName: 'Cooperatives',
    timestamps: false
});

export default Cooperatives;
