import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Cities extends Model<
    InferAttributes<Cities>,
    InferCreationAttributes<Cities>
> {
    declare id: string;
    declare province_id: string;
    declare name: string;
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
        type: DataTypes.STRING(60),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'cities',
    timestamps: false
});

export default Cities;
