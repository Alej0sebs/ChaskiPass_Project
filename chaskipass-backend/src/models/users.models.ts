import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

// Definición del modelo usando `init()`
export class Users extends Model<
    InferAttributes<Users>,
    InferCreationAttributes<Users>
> {
    public dni!: string;
    public name!: string;
    public last_name!: string;
    public user_name!: string;
    public email!: string;
    public phone!: string;
    public password!: string;
    public address?: string;
    public role_id!: string;
    public cooperative_id!: string;
}

// Inicializar el modelo usando `init()`
Users.init({
    dni: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
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
    phone: {
        type: DataTypes.STRING(14),
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(80),
        allowNull: true,
    },
    role_id: {
        type: DataTypes.CHAR(5),
        allowNull: false,
    },
    cooperative_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
}, {
    sequelize: connectionDb,  // Conexión a la base de datos
    tableName: 'users',       // Nombre de la tabla en la base de datos
});
