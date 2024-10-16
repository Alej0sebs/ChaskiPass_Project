import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Provinces extends Model<
    InferAttributes<Provinces>,
    InferCreationAttributes<Provinces>
> {
    declare id: string;
    declare name: string;
}

Provinces.init({
    id: {
        type: DataTypes.CHAR(3),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'Provinces',
    timestamps: false
});

export default Provinces;
