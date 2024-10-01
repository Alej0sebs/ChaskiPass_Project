import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Cities extends Model<
    InferAttributes<Cities>,
    InferCreationAttributes<Cities>
> {
    public id!: string;
    public province_id!: string;
    public name!: string;
}

Cities.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    province_id: {
        type: DataTypes.CHAR(3),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'cities',
    timestamps: false
});

export default Cities;
