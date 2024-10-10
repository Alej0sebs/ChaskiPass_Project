import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class BusStructure extends Model<
    InferAttributes<BusStructure>,
    InferCreationAttributes<BusStructure>
> {
    declare id: number;
    declare name: string;
    declare layout: string;
    declare cooperative_id: string;
}

BusStructure.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    layout: { 
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cooperative_id:{
        type: DataTypes.STRING(10),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,
    tableName: 'Bus_Structure',
    timestamps: false
});

export default BusStructure;
