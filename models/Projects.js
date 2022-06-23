'use strict';
const { Sequelize, DataTypes } = require("sequelize")
module.exports = (sequelize, DataTypes) => {

    const Projects = sequelize.define('Projects', { 
        id: {
            type: DataTypes.UUID, 
            primaryKey:true, 
            allowNull:false
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'APPROVED'),
            allowNull: false
        }
    });

    Projects.associate = function(models) {


    }

    return Projects;

    
};
