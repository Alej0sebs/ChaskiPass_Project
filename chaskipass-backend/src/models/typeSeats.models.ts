import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class TypeSeats extends Model<
    InferAttributes<TypeSeats>,
    InferCreationAttributes<TypeSeats>
> {
    public id!: string;
    public cooperative_id!: string;
    public name!: string;
    public description?: string;
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
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    sequelize: connectionDb,
    tableName: 'type_seats',
    timestamps: false
});

export default TypeSeats;
