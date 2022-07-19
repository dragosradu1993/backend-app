'use strict';
const { Sequelize, DataTypes } = require("sequelize")
module.exports = (sequelize, DataTypes) => {

    const Messages = sequelize.define('Messages', { 
        id : {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        senderName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senderId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        receiverId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.ENUM('NOTREAD', 'READ'),
            allowNull: false,
            defaultValue: 'NOTREAD'
        }
    }
    );

    Messages.associate = (models) => {
        Messages.belongsTo(models.Promotions)
    }

    return Messages;

    
};
