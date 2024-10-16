import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

// Definición del modelo de Administrador
export class Admin extends Model<
    InferAttributes<Admin>,
    InferCreationAttributes<Admin>
> {
    declare dni: string;
    declare user_name: string;
    declare email: string;
    declare password: string;
    declare role_id: string;
}

// Inicializar el modelo Admin con el rol predeterminado "superAdmin"
Admin.init({
    dni: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    user_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'superAdmin',
    }
}, {
    sequelize: connectionDb,
    tableName: 'Admins',
});
