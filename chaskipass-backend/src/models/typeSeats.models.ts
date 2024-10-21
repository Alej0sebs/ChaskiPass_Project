import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class TypeSeats extends Model<
    InferAttributes<TypeSeats>,
    InferCreationAttributes<TypeSeats>
> {
    declare id: string;
    declare cooperative_id: string;
    declare name: string; // nombre para reconocer como "Vip" "Economico" "Normal"
    declare special_caracter:string;
    declare description: string;
    declare additional_cost: number;
}

TypeSeats.init({
    id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
    },
    cooperative_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    special_caracter: {
        type: DataTypes.STRING(3),
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    additional_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
}, {
    sequelize: connectionDb,
    tableName: 'Type_seats',
    timestamps: false
});

export default TypeSeats;
