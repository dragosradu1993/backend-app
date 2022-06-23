'use strict';
const { Sequelize, DataTypes } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profiles', {
        id : {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        lastName: {
            type: DataTypes.STRING, 
            allowNull:false
        }, 
        firstName: {
            type: DataTypes.STRING, 
            allowNull:false
        }, 
        phoneNumber: {
            type: DataTypes.STRING, 
            allowNull:true
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Profile.associate = function(models) {
        Profile.belongsTo(models.Users)
        Profile.hasOne(models.Students)
        Profile.hasOne(models.Teachers)
        Profile.hasOne(models.Secretaries)
    }

    return Profile;

};
