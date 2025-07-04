import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class Buses extends Model<
    InferAttributes<Buses>,
    InferCreationAttributes<Buses>
> {
    declare id: number;
    declare cooperative_id: string;
    declare bus_number: string;
    declare license_plate: string;
    declare chassis_vin: string;
    declare bus_manufacturer: string;
    declare model: string;
    declare year: number;
    declare capacity: number;
    declare picture: string;  // Campo opcional
    declare bus_structure_id: number;  // Campo opcional
}

// Inicializar el modelo usando `init()`
Buses.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cooperative_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    bus_number: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    license_plate: {
        type: DataTypes.STRING(8),
        allowNull: false,
    },
    chassis_vin: {
        type: DataTypes.STRING(17),
        allowNull: false,
    },
    bus_manufacturer: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    picture: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    bus_structure_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    sequelize: connectionDb,  // Conexión a la base de datos
    tableName: 'Buses',       // Nombre de la tabla en la base de datos
    timestamps: false         // Deshabilitar timestamps si no son necesarios
});

export default Buses;
