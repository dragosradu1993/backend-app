const { Sequelize, DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const User = sequelize.define("Users", {
        id : {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmailOrEmpty(val, next) {
                    if(!val || val === "" || validateEmail(val)) {
                        return next()
                    } else {
                        return next('Email is invalid!')
                    }
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userBlocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        loginRetry: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        connected: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        firstLogin: {
            type: DataTypes.BOOLEAN,
            defaultValue:true,
            allowNull: false
        }
    })

    User.associate = (models) => {
        User.hasOne(models.Profiles)
        User.hasOne(models.UserRoles)
    }
    return User
}

validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}