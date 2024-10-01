import { Model, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import connectionDb from "../db/connection.db";

export class NotificationMails extends Model<
    InferAttributes<NotificationMails>,
    InferCreationAttributes<NotificationMails>
> {
    public id!: string;
    public user_id!: string;
    public subject!: string;
    public message!: string;
    public status!: 'pending' | 'sent' | 'error';
    public sent_date?: Date;
}

NotificationMails.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'sent', 'error'),
        allowNull: false,
    },
    sent_date: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    sequelize: connectionDb,
    tableName: 'notification_mails',
    timestamps: false
});

export default NotificationMails;
