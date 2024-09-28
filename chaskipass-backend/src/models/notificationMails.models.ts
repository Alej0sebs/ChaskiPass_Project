import connectionDb from "../db/connection.db";
import { DataTypes } from "sequelize";

export const NotificationMails= connectionDb.define('notification_mails',{
    id:{
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    user_id:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    subject:{
        type: DataTypes.STRING,
        allowNull: false
    },
    message:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('pending','sent','error'),
        allowNull: false
    },
    sent_date:{
        type: DataTypes.DATE,
        allowNull: true
    }
});