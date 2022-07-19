'use strict';
const { Sequelize, DataTypes } = require("sequelize")
module.exports = (sequelize, DataTypes) => {

    const Projects = sequelize.define('Projects', { 
        id : {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('LICENTA', 'MASTER'),
            allowNull: false,
        },
        rejectReason: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        state: {
            type: DataTypes.ENUM('PENDING', 'REJECTED', 'APPROVED'),
            allowNull: false,
            defaultValue: 'PENDING'
        }
    }
    );

    Projects.associate = function(models) {
        Projects.belongsTo(models.Students)
        Projects.belongsTo(models.Teachers)
        Projects.belongsTo(models.Promotions)
    }

    return Projects;

    
};
